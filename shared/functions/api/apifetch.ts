import 'shared/types/declarations/vite-env.d.ts';

type Method = 'GET' | 'PUT' | 'PATCH' | 'DELETE';

const API_URL = new URL(import.meta.env.VITE_API_URL);

/**
 * Sends a request to the backend. Returns undefined if something goes wrong.
 *
 * @returns `undefined` if the operation was successful, otherwise returns the body of the response.
 */
export async function apiFetch<RequestBody extends object | undefined = undefined>(
  method: Method,
  path: string,
  body?: RequestBody,
  headers?: HeadersInit,
): Promise<any | undefined> {
  const url = new URL(API_URL + '/' + path);
  try {
    const response = await fetch(url, {
      method: method,
      body: body && JSON.stringify(body),
      headers: headers,
    });
    if (response.ok) {
      try {
        return response.json();
      } catch {
        console.warn('API returned 200 and invalid JSON');
        return null;
      }
    }
    console.error(`Fetch error: ${url.href} returned ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error(`Fetch error: ${url.href} - ${error}`);
  }
  return undefined;
}
