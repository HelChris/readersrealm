import { NOROFF_API_KEY } from '../../constants/config.js';
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';

/**
 * Updates an existing post with new data
 *
 * @param {string} id - The unique identifier of the post to update
 * @param {Object} post - The updated post data
 * @param {string} [post.title] - The updated title of the post
 * @param {string} [post.body] - The updated content of the post
 * @param {string[]} [post.tags] - The updated array of tags for the post
 * @param {string} [post.media] - The updated URL to media associated with the post
 * @returns {Promise<Object>} A promise that resolves to the server response with the updated post data
 * @throws {Error} If the user is not logged in or if the post update fails
 *
 * @example
 * // Update a post with new title and content
 * try {
 *   const updatedPost = await updatePost("post123", {
 *     title: "Updated Post Title",
 *     body: "This is the updated content of my post"
 *   });
 *   console.log("Post updated successfully:", updatedPost);
 * } catch (error) {
 *   console.error("Failed to update post:", error.message);
 * }
 */
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
