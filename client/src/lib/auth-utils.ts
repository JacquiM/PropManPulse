export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*Unauthorized/.test(error.message);
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem("propmanpulse_user");
  if (!user) return null;
  
  try {
    const parsedUser = JSON.parse(user);
    return parsedUser.id; // Use user ID as simple auth token
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

export function getUserFromStorage() {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem("propmanpulse_user");
  if (!user) return null;
  
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function clearAuthData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("propmanpulse_user");
}

export function setAuthData(user: any): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem("propmanpulse_user", JSON.stringify(user));
}

export function hasRole(requiredRole: string): boolean {
  const user = getUserFromStorage();
  if (!user) return false;
  
  // Role hierarchy: admin > manager > owner > tenant
  const roleHierarchy = ['admin', 'manager', 'owner', 'tenant'];
  const userRoleIndex = roleHierarchy.indexOf(user.role);
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
  
  return userRoleIndex !== -1 && userRoleIndex <= requiredRoleIndex;
}

export function canAccessModule(module: string): boolean {
  const user = getUserFromStorage();
  if (!user) return false;
  
  // Module access permissions by role
  const modulePermissions = {
    community: ['admin', 'manager'],
    rental: ['admin', 'manager', 'owner'],
    maintenance: ['admin', 'manager', 'owner', 'tenant'],
    compliance: ['admin', 'manager'],
    financial: ['admin', 'manager', 'owner'],
    users: ['admin']
  };
  
  const allowedRoles = modulePermissions[module as keyof typeof modulePermissions] || [];
  return allowedRoles.includes(user.role);
}
