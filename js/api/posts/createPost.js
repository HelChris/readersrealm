import { NOROFF_API_KEY } from '../../constants/config.js';
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';
/**
 * Creates a new post by sending post data to the server
 *
 * @param {Object} post - The post data to be created
 * @param {string} post.title - The title of the post
 * @param {string} post.body - The content of the post
 * @param {string[]} [post.tags] - Optional array of tags for the post
 * @param {string} [post.media] - Optional URL to media associated with the post
 * @returns {Promise<Object>} A promise that resolves to the server response with the created post data
 * @throws {Error} If the user is not logged in or if the post creation fails
 *
 * @example
 * // Create a new post with title, body and tags
 * try {
 *   const newPost = await createPost({
 *     title: "My First Post",
 *     body: "This is the content of my post",
 *     tags: ["javascript", "webdev"]
 *   });
 *   console.log("Post created successfully:", newPost);
 * } catch (error) {
 *   console.error("Failed to create post:", error.message);
 * }
 */
export async function createPost(post) {
  const accessToken = getFromLocalStorage('accessToken');

  if (!accessToken) {
    throw new Error('You must be logged in to create a post');
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': NOROFF_API_KEY,
    },
    body: JSON.stringify(post),
  };

  try {
    const response = await fetch(AUTH_ENDPOINTS.posts, options);
    const json = await response.json();

    if (!response.ok) {
      console.error('API error response:', json);
      throw new Error(
        json.errors?.[0]?.message || 'Oh no, post creation failed'
      );
    }

    return json;
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
}
