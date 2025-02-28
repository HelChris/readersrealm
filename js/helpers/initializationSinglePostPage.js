// import { fetchPostById } from '../api/posts/postsApi.js';
// import { getPostIdFromUrl } from './urlHandling.js';
// import { generateSinglePostView } from '../ui/posts/generateSinglePostView.js';
// import { setupSinglePostEventListeners } from '../events/posts/singlePostEventHandlers.js';
// import { showError } from '../ui/shared/errorHandling.js';

// export async function initializeSinglePostPage() {
//   try {
//     // Get post ID from URL query parameter
//     const urlParams = new URLSearchParams(window.location.search);
//     const postId = urlParams.get('id');

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

//     generateSinglePostView(post, postContainer);
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
