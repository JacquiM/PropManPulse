import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { config } from "./config";
import { mockStats, mockRecentActivities, mockUpcomingInspections } from "./mock-data";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Mock API for demo mode
function getMockData(url: string) {
  if (url.includes('/api/stats')) {
    return mockStats;
  }
  if (url.includes('/api/activities')) {
    return mockRecentActivities;
  }
  if (url.includes('/api/inspections')) {
    return mockUpcomingInspections;
  }
  // Return empty array for other endpoints
  return [];
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  if (config.isDemoMode) {
    // Simulate API response in demo mode
    const mockData = getMockData(url);
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }: any) => {
    const url = queryKey.join("/") as string;
    
    if (config.isDemoMode) {
      // Return mock data in demo mode
      return getMockData(url);
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
