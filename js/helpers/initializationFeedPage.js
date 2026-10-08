import { fetchPosts } from '../api/posts/posts.js';
import { generatePosts } from '../ui/posts/generatePosts.js';
import { initializeFilters } from '../events/posts/filterHandlers.js';
import { setupCreatePostFormSubmit } from '../events/posts/createPostHandler.js';
import { generateCreatePostForm } from '../ui/posts/generateCreatePostForm.js';

/**
 * Initializes the feed page with posts and sets up all UI components
 *
 * This function fetches posts from the API, renders them in the UI,
 * initializes filtering functionality, sets up the create post form,
 * and configures event handlers for page interactions.
 *
 * @returns {Promise<void>} A promise that resolves when the feed page is initialized
 *
 * @example
 * // Initialize the feed page when the DOM is loaded
 * document.addEventListener('DOMContentLoaded', async () => {
 *   try {
 *     await initializeFeedPage();
 *     console.log('Feed page initialized successfully');
 *   } catch (error) {
 *     console.error('Failed to initialize feed page:', error.message);
 *   }
 * });
 */
export async function initializeFeedPage() {
  try {
    // Show loading state
    const postsContainer = document.getElementById('postsList');
    if (postsContainer) {
      postsContainer.innerHTML =
        '<p class="text-center py-8">Loading posts...</p>';
    }

    // render the create new post form
    const createPostContainer = document.getElementById('create-post');
    if (createPostContainer) {
      createPostContainer.appendChild(generateCreatePostForm());
    }

    const posts = await fetchPosts();
    generatePosts(posts);
    initializeFilters(posts);
    setupCreatePostFormSubmit();
    setupCreatePostButton();
  } catch (error) {
    console.error('Error initializing feed:', error);
    // Show error state
    const postsContainer = document.getElementById('postsList');
    if (postsContainer) {
      postsContainer.innerHTML =
        '<p class="text-center py-8 text-red-500">Failed to load posts. Please try again later.</p>';
    }
  }
}

function setupCreatePostButton() {
  const newPostButton = document.getElementById('new-post-button');
  const createPostForm = document.getElementById('create-post');

  if (newPostButton && createPostForm) {
    newPostButton.addEventListener('click', function () {
      createPostForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        const titleInput = document.getElementById('title');
        if (titleInput) titleInput.focus();
      }, 800);
    });
  }
}
