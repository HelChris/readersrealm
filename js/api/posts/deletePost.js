// import { NOROFF_API_KEY } from '../../constants/config.js';
// import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
// import { getFromLocalStorage } from '../../helpers/localStorage.js';

// export async function deletePost(postId) {
//   const accessToken = getFromLocalStorage('accessToken');

//   if (!accessToken) {
//     throw new Error('Sorry,you must be logged in to do that.');
//   }

//   const options = {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'X-Noroff-API-Key': NOROFF_API_KEY,
//     },
//   };

//   const url = `${AUTH_ENDPOINTS.posts}/${postId}`;

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     throw new Error('Oh no, post creation failed');
//   }
// }

import { NOROFF_API_KEY } from '../../constants/config.js';
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';

/**
 * Deletes a post by its ID
 *
 * @param {string} postId - The unique identifier of the post to delete
 * @returns {Promise<void>} A promise that resolves when the post is successfully deleted
 * @throws {Error} If the user is not logged in or if the deletion fails
 *
 * @example
 * // Delete a post with a specific ID
 * try {
 *   await deletePost("post123");
 *   console.log("Post deleted successfully");
 * } catch (error) {
 *   console.error("Failed to delete post:", error.message);
 * }
 */
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