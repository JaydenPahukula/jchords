/// <reference path="../declarations/vite-env.d.ts" />

type Method = 'GET' | 'HEAD' | 'POST';

const API_URL = new URL(import.meta.env.VITE_API_URL);

export default async function apiFetch(path: string, method: Method): Promise<any> {
  const url = new URL(API_URL + '/' + path);
  try {
    const response = await fetch(url, {
      method: method,
    });
    if (response.ok) {
      return response.json();
    }
    console.error(`Fetch error: ${url.href} returned ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error(`Fetch error: ${url.href}`);
  }
}
