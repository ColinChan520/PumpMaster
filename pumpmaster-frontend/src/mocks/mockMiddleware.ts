import mockData from '../assets/mockData.json';

export async function mockFetch(url: string, method: string, data?: any) {
  console.log(`[MockMiddleware] request ${method} ${url}`);

  const response = (mockData as Record<string, any>)[url];

  if (!response) {
    return Promise.reject({ status: response.status, message: `Mock API not found: ${url}` })
  }

  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject({ status: response.status, message: response.message });
  }

}