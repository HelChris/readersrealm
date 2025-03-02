import { createPost } from '../../api/posts/createPost.js';
import { showError } from '../../ui/shared/errorHandling.js';
import { showSuccess } from '../../ui/shared/success.js';
/**
 * Handles the submission of the create post form
 */

/**
 * Sets up the create post form submission event
 */
export function setupCreatePostFormSubmit() {
  const form = document.getElementById('createPostForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await handleCreatePostSubmit(form);
    });
  }
}

/**
 * Handles the form submission and calls the API
 * @param {HTMLFormElement} form - The create post form element
 */
async function handleCreatePostSubmit(form) {
  // Define submitButton at the beginning so it's available in all blocks
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.textContent : 'Post';

  try {
    // Show loading state
    if (submitButton) {
      submitButton.textContent = 'Posting...';
      submitButton.disabled = true;
    }

    // Get data from form
    const postData = getPostDataFromForm(form);

    // Validate required fields
    if (!postData.title) {
      showError('Post title is required', '#form-messages');
      resetButton(submitButton, originalButtonText);
      return;
    }

    // Create the post - no need to store in 'result' if we don't use it
    await createPost(postData);

    // Show success message
    showSuccess('Post created successfully!', '#form-messages');

    // Reset form
    form.reset();

    // Reload page after a short delay (to let user see success message)
    setTimeout(() => {
      window.location.href = '/feed/';
    }, 1500);
  } catch (error) {
    console.error('Error creating post:', error);
    showError(error.message || 'Failed to create post', '#form-messages');
  } finally {
    // Reset button
    resetButton(submitButton, originalButtonText);
  }
}

/**
 * Extracts and formats post data from the form
 * @param {HTMLFormElement} form - The create post form
 * @returns {Object} The formatted post data for the API
 */
function getPostDataFromForm(form) {
  // Basic required data
  const postData = {
    title: form.querySelector('#title').value.trim(),
    body: form.querySelector('#body').value.trim(),
    tags: [],
  };

  // Add book title tag if provided
  const bookTitle = form.querySelector('#bookTitle').value.trim();
  if (bookTitle) {
    postData.tags.push(`book:${bookTitle}`);
  }

  // Add author tag if provided
  const bookAuthor = form.querySelector('#bookAuthor').value.trim();
  if (bookAuthor) {
    postData.tags.push(`author:${bookAuthor}`);
  }

  // Add rating tag if selected
  const ratingSelect = form.querySelector('#rating');
  if (ratingSelect && ratingSelect.selectedIndex > 0) {
    postData.tags.push(`rating:${ratingSelect.value}`);
  }

  // Handle media URL if provided
  const mediaUrl = form.querySelector('#mediaUrl')?.value.trim();
  const mediaAlt =
    form.querySelector('#mediaAlt')?.value.trim() || 'Post image';

  if (mediaUrl) {
    // Only add media if URL is provided
    postData.media = {
      url: mediaUrl,
      alt: mediaAlt,
    };
  }

  console.log('Post data being sent:', postData); // Debug the data
  return postData;
}

/**
 * Resets a button to its original state
 * @param {HTMLButtonElement} button - The button to reset
 * @param {string} originalText - The original button text
 */
function resetButton(button, originalText) {
  if (button) {
    button.textContent = originalText;
    button.disabled = false;
  }
}
