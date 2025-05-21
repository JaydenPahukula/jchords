import 'shared/types/declarations/vite-env.d.ts';

type Method = 'GET';

const API_URL = new URL(import.meta.env.VITE_API_URL);

export async function apiFetch<RequestBody = undefined>(
  method: Method,
  path: string,
  body?: RequestBody,
): Promise<any> {
  const url = new URL(API_URL + '/' + path);
  try {
    const response = await fetch(url, {
      method: method,
      body: body && JSON.stringify(body),
    });
    if (response.ok) {
      return await response.json();
    }
    console.error(`Fetch error: ${url.href} returned ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error(`Fetch error: ${url.href} - ${error}`);
  }
  return undefined;
}
