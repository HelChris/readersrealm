import { fetchPosts } from '../api/posts/posts.js';
import { generatePosts, showPostSkeletons } from '../ui/posts/generatePosts.js';
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
      showPostSkeletons();
    }

    // render the create new post form
    const createPostContainer = document.getElementById('create-post-form');
    if (createPostContainer) {
      createPostContainer.innerHTML = '';
      createPostContainer.appendChild(generateCreatePostForm());
    }

    setupCreatePostFormSubmit();
    setupCreatePostButton();
    setupBackToTopButton();

    const posts = await fetchPosts();
    generatePosts(posts);
    initializeFilters(posts);
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
  const modal = document.getElementById('create-post-container');
  const closeButton = document.getElementById('close-create-post');

  if (!newPostButton || !modal) {
    return;
  }

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  newPostButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.getElementById('title')?.focus();
  });
  closeButton?.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

function setupBackToTopButton() {
  const backToTopButton = document.getElementById('back-to-top');

  if (!backToTopButton) {
    return;
  }

  const updateVisibility = () => {
    backToTopButton.classList.toggle('hidden', window.scrollY < 400);
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  updateVisibility();
}
