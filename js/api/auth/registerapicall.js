import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';

export async function register(user) {
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(AUTH_ENDPOINTS.register, options);
  const json = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Oh no, registration failed');
  }

  return json;
}
