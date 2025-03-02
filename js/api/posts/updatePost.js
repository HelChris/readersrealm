import { NOROFF_API_KEY } from '../../constants/config.js';
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';

export async function updatePost(id, post) {
  const accessToken = getFromLocalStorage('accessToken');

  if (!accessToken) {
    throw new Error('You must be logged in to create a post');
  }

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': NOROFF_API_KEY,
    },
    body: JSON.stringify(post),
  };

  const url = `${AUTH_ENDPOINTS.posts}/${id}`;

  const response = await fetch(url, options);
  const json = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Oh no, post update failed');
  }

  return json;
}
