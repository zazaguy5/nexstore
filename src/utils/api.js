const BASE_URL = 'http://localhost:3000';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status ${response.status}`);
  }

  return response.json();
}