// import { fetchPostById } from '../api/posts/postsApi.js';
// import { getPostIdFromUrl } from './urlHandling.js';
// import { generateSinglePostView } from '../ui/posts/generateSinglePostView.js';
// import { setupSinglePostEventListeners } from '../events/posts/singlePostEventHandlers.js';
// import { showError } from '../ui/shared/errorHandling.js';

// export async function initializeSinglePostPage() {
//   try {
//     // Use the utility function to get post ID from URL
//     const postId = getPostIdFromUrl();

//     if (!postId) {
//       showError('No post ID provided', '#post-container');
//       return;
//     }

//     // Show loading state
//     const postContainer = document.getElementById('post-container');
//     if (postContainer) {
//       postContainer.innerHTML =
//         '<p class="text-center py-8">Loading post...</p>';
//     }

//     const post = await fetchPostById(postId);

//     if (!post) {
//       showError('Post not found', '#post-container');
//       return;
//     }

//     // Generate the post view (the URL update happens inside generateSinglePostView)
//     generateSinglePostView(post, postContainer);

//     // Setup event listeners
//     setupSinglePostEventListeners();
//   } catch (error) {
//     console.error('Error initializing single post view:', error);
//     showError('Failed to load post', '#post-container');
//   }
// }

import { fetchPostById } from '../api/posts/postsApi.js';
import { getPostIdFromUrl } from './urlHandling.js';
import { generateSinglePostView } from '../ui/posts/generateSinglePostView.js';
import { setupSinglePostEventListeners } from '../events/posts/singlePostEventHandlers.js';
import { showError } from '../ui/shared/errorHandling.js';

/**
 * Initializes the single post page by fetching and displaying a specific post
 *
 * This function extracts the post ID from the URL, fetches the corresponding post data,
 * renders the single post view, and sets up event handlers for interactions.
 *
 * @returns {Promise<void>} A promise that resolves when the single post page is initialized
 *
 * @example
 * // Initialize the single post page when the DOM is loaded
 * document.addEventListener('DOMContentLoaded', async () => {
 *   try {
 *     await initializeSinglePostPage();
 *     console.log('Single post page initialized successfully');
 *   } catch (error) {
 *     console.error('Failed to initialize single post page:', error.message);
 *   }
 * });
 */
export async function initializeSinglePostPage() {
  try {
    // Use the utility function to get post ID from URL
    const postId = getPostIdFromUrl();

    if (!postId) {
      showError('No post ID provided', '#post-container');
      return;
    }

    // Show loading state
    const postContainer = document.getElementById('post-container');
    if (postContainer) {
      postContainer.innerHTML =
        '<p class="text-center py-8">Loading post...</p>';
    }

    const post = await fetchPostById(postId);

    if (!post) {
      showError('Post not found', '#post-container');
      return;
    }

    // Generate the post view (the URL update happens inside generateSinglePostView)
    generateSinglePostView(post, postContainer);

    // Setup event listeners
    setupSinglePostEventListeners();
  } catch (error) {
    console.error('Error initializing single post view:', error);
    showError('Failed to load post', '#post-container');
  }
}