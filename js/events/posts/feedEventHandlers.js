import { handleCreatePostFormSubmit } from './userCreatePost.js';

export function setupFeedEventListeners() {
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

  //set up new post button to scroll to the create post form
  setupNewPostButton();

  //set up the create post form submission
  setupCreatePostForm();
}

function setupNewPostButton() {
  const newPostButton = document.getElementById('new-post-button');
  const createPostForm = document.getElementById('create-post');

  if (newPostButton && createPostForm) {
    newPostButton.addEventListener('click', () => {
      //smooth scroll to the create post form
      createPostForm.scrollIntoView({ behavior: 'smooth' });

      //focus on first input field:
      setTimeout(() => {
        const firstInput = document.getElementById('postTitle');
        if (firstInput) {
          firstInput.focus();
        }
      }, 500); // slight delay to allow scroll animation to complete
    });
  }
}

// set up create post form submission event
function setupCreatePostForm() {
  const createPostForm = document.querySelector('#create-post form');

  if (createPostForm) {
    createPostForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleCreatePostFormSubmit(createPostForm);
    });
  }
}
