import { fetchPosts } from '../api/posts/posts.js';
import { generatePosts } from '../ui/posts/generatePosts.js';
import { initializeFilters } from '../events/posts/filterHandlers.js';
import { setupCreatePostFormSubmit } from '../events/posts/createPostHandler.js';
import { generateCreatePostForm } from '../ui/posts/generateCreatePostForm.js';

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
