// Configuration for static deployment
export const isStaticDeployment = import.meta.env.PROD && !import.meta.env.VITE_API_URL;

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || (isStaticDeployment ? '' : 'http://localhost:5000'),
  isDemoMode: isStaticDeployment,
};
