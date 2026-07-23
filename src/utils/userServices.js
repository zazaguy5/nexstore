import { apiRequest } from "./api";

export function login(body) {
  return apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function registerUser({ name, accname, password }) {
  const now = new Date();
  const startdate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  return apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, accname, password, startdate }),
  });
}

export async function getProductById(id) {
  return await apiRequest(`/products/${id}`);
}