import { generatePostElement } from '../posts/generatePost.js';
/**
 * Generates and renders post elements in the posts list container
 *
 * This function takes an array of post objects, generates HTML elements for each post
 * using the generatePostElement function, and appends them to the posts list container.
 * If no posts are available, it displays a "No posts available" message.
 *
 * @param {Array<Object>} posts - Array of post objects to be rendered
 * @returns {void}
 *
 * @example
 * // Fetch posts and generate the post list
 * try {
 *   const postsData = await fetchPosts();
 *   generatePosts(postsData);
 *   console.log(`Generated ${postsData.length} post elements`);
 * } catch (error) {
 *   console.error('Failed to generate posts:', error.message);
 * }
 */

export function generatePosts(posts) {
  const postsList = document.getElementById('postsList');
  if (!postsList) return;

  postsList.innerHTML = '';

  if (!posts || posts.length === 0) {
    const noPostsMessage = document.createElement('p');
    noPostsMessage.className = 'text-center text-gray-500 my-8';
    noPostsMessage.textContent = 'No posts available';
    postsList.appendChild(noPostsMessage);
    return;
  }

  posts.forEach((post) => {
    const postElement = generatePostElement(post);
    postsList.appendChild(postElement);
  });
}
