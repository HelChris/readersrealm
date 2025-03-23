import { setupCreatePostFormSubmit } from './createPostHandler.js';
/**
 * Sets up all event listeners for the feed page
 *
 * Initializes event handlers for viewing posts, creating new posts,
 * and form submission on the feed page
 *
 * @returns {void}
 *
 * @example
 * // Initialize all feed page event listeners when the DOM is loaded
 * document.addEventListener('DOMContentLoaded', () => {
 *   setupFeedEventListeners();
 *   console.log('Feed page event listeners initialized');
 * });
 */
export function setupFeedEventListeners() {
  // Set up post view button clicks
  setupPostViewButtonEvents();

  // Set up new post button
  setupNewPostButton();

  //set up the form submission
  setupCreatePostFormSubmit();
}

/**
 * Sets up event delegation for post view buttons
 */
function setupPostViewButtonEvents() {
  const postsContainer = document.getElementById('postsList');

  if (postsContainer) {
    // Delegate clicks on the view post buttons
    postsContainer.addEventListener('click', (event) => {
      const viewButton = event.target.closest('.view-post-button');
      if (viewButton) {
        const postId = viewButton.dataset.postId;
        if (postId) {
          // Navigate to single post page
          window.location.href = `/feed/post.html?id=${postId}`;
        }
      }
    });
  }
}

/**
 * Sets up the new post button to scroll to the create post form
 */
function setupNewPostButton() {
  const newPostButton = document.getElementById('new-post-button');
  const createPostForm = document.getElementById('create-post');

  if (newPostButton && createPostForm) {
    newPostButton.addEventListener('click', function () {
      // Scroll to the form with smooth animation
      createPostForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      //Focus on the first input field after scrolling
      setTimeout(() => {
        const titleInput = document.getElementById('title');
        if (titleInput) {
          titleInput.focus();
        }
      }, 800);
    });
  }
}
