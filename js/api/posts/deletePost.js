import { NOROFF_API_KEY } from '../../constants/config.js';
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';

export async function deletePost(postId) {
  const accessToken = getFromLocalStorage('accessToken');

  if (!accessToken) {
    throw new Error('Sorry,you must be logged in to do that.');
  }

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': NOROFF_API_KEY,
    },
  };

  const url = `${AUTH_ENDPOINTS.posts}/${postId}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Oh no, post creation failed');
  }
}
