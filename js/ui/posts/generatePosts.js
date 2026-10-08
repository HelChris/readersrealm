import { generatePostElement } from '../posts/generatePost.js';

export function showPostSkeletons(count = 3) {
  const postsList = document.getElementById('postsList');
  if (!postsList) return;

  postsList.innerHTML = '';
  postsList.setAttribute('aria-busy', 'true');

  for (let index = 0; index < count; index += 1) {
    const skeleton = document.createElement('article');
    skeleton.className =
      'post-card bg-white p-4 rounded-lg shadow flex flex-col h-full animate-pulse';
    skeleton.setAttribute('aria-hidden', 'true');
    skeleton.innerHTML = `
      <div class="flex items-center mb-3">
        <div class="w-16 h-16 rounded-full bg-gray-200"></div>
        <div class="ml-2 space-y-2">
          <div class="h-4 w-24 rounded bg-gray-200"></div>
          <div class="h-3 w-16 rounded bg-gray-200"></div>
        </div>
      </div>
      <div class="h-6 w-3/4 rounded bg-gray-200 mb-3"></div>
      <div class="mb-4 flex-grow">
        <div class="w-full aspect-square rounded-md bg-gray-200"></div>
      </div>
      <div class="h-5 w-20 rounded bg-gray-200 mb-3"></div>
      <div class="mt-auto pt-3">
        <div class="h-10 w-full rounded bg-gray-200"></div>
      </div>
    `;
    postsList.appendChild(skeleton);
  }
}
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
  postsList.setAttribute('aria-busy', 'false');

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
