import { fetchPosts } from '../api/posts/postsApi.js';
import { generatePosts } from '../ui/posts/generatePosts.js';
import { initializeFilters } from '../events/posts/filterHandlers.js';
import { setupFeedEventListeners } from '../events/posts/feedEventHandlers.js';
import { sortPosts } from '../helpers/postSorter.js';

export async function initializeFeedPage() {
  try {
    // Show loading state
    const postsContainer = document.getElementById('postsList');
    if (postsContainer) {
      postsContainer.innerHTML =
        '<p class="text-center py-8">Loading posts...</p>';
    }

    const posts = await fetchPosts();
    const sortedPosts = sortPosts(posts, 'newest');
    generatePosts(sortedPosts);
    initializeFilters(posts);
    setupFeedEventListeners();
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