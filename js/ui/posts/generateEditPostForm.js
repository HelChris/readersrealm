import { fetchPostById } from '../../api/posts/postsApi.js';
import { updatePost } from '../../api/posts/updatePost.js';
import { getPostIdFromUrl } from '../../helpers/urlHandling.js';
import { showSuccess } from '../shared/success.js';
import { showError } from '../shared/errorHandling.js';

export async function initializeEditPostPage() {
  try {
    // Get the post ID from URL
    const postId = getPostIdFromUrl();

    if (!postId) {
      showError('No post ID provided', '#edit-message');
      return;
    }

    // Show loading state
    const formContainer = document.getElementById('edit-form-container');
    formContainer.innerHTML =
      '<p class="text-center py-4">Loading post data...</p>';

    // Fetch the post data
    const post = await fetchPostById(postId);

    if (!post) {
      showError('Post not found', '#edit-message');
      return;
    }

    // Generate the edit form with post data
    generateEditForm(post, formContainer);
  } catch (error) {
    console.error('Error initializing edit page:', error);
    showError('Failed to load post data', '#edit-message');
  }
}

function generateEditForm(post, container) {
  // Clear loading message
  container.innerHTML = '';

  // Create form
  const form = document.createElement('form');
  form.id = 'editPostForm';

  // Extract tags
  const bookTag =
    post.tags?.find((tag) => tag.startsWith('book:'))?.replace('book:', '') ||
    '';
  const authorTag =
    post.tags
      ?.find((tag) => tag.startsWith('author:'))
      ?.replace('author:', '') || '';
  const ratingTag =
    post.tags
      ?.find((tag) => tag.startsWith('rating:'))
      ?.replace('rating:', '') || '';

  // Create form fields
  const titleGroup = createFormGroup('title', 'Post Title', 'text', post.title);
  const bodyGroup = createFormGroup(
    'body',
    'Your Thoughts',
    'textarea',
    post.body
  );
  const bookTitleGroup = createFormGroup(
    'bookTitle',
    'Book Title (Optional)',
    'text',
    bookTag
  );
  const authorGroup = createFormGroup(
    'bookAuthor',
    'Author (Optional)',
    'text',
    authorTag
  );

  // Rating select
  const ratingGroup = document.createElement('div');
  ratingGroup.className = 'mb-4';

  const ratingLabel = document.createElement('label');
  ratingLabel.setAttribute('for', 'rating');
  ratingLabel.className = 'block text-gray-700';
  ratingLabel.textContent = 'Rating (Optional)';

  const ratingSelect = document.createElement('select');
  ratingSelect.id = 'rating';
  ratingSelect.name = 'rating';
  ratingSelect.className = 'w-full p-2 border border-gray-300 rounded';

  // Add options
  const options = [
    { value: '', text: 'Select rating' },
    { value: '1', text: '1 - Poor' },
    { value: '2', text: '2 - Fair' },
    { value: '3', text: '3 - Good' },
    { value: '4', text: '4 - Very Good' },
    { value: '5', text: '5 - Excellent' },
  ];

  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    // Select the current rating
    if (option.value === ratingTag) {
      optionElement.selected = true;
    }
    ratingSelect.appendChild(optionElement);
  });

  ratingGroup.appendChild(ratingLabel);
  ratingGroup.appendChild(ratingSelect);

  // Media URL group
  const mediaGroup = document.createElement('div');
  mediaGroup.className = 'mb-4';

  const mediaLabel = document.createElement('label');
  mediaLabel.className = 'block text-gray-700';
  mediaLabel.textContent = 'Image URL (Optional)';

  const mediaInput = document.createElement('input');
  mediaInput.type = 'url';
  mediaInput.id = 'mediaUrl';
  mediaInput.name = 'mediaUrl';
  mediaInput.value = post.media?.url || '';
  mediaInput.placeholder = 'https://example.com/image.jpg';
  mediaInput.className = 'w-full p-2 border border-gray-300 rounded';

  const mediaAltLabel = document.createElement('label');
  mediaAltLabel.className = 'block text-gray-700 mt-2';
  mediaAltLabel.textContent = 'Image Description (Alt Text)';

  const mediaAltInput = document.createElement('input');
  mediaAltInput.type = 'text';
  mediaAltInput.id = 'mediaAlt';
  mediaAltInput.name = 'mediaAlt';
  mediaAltInput.value = post.media?.alt || '';
  mediaAltInput.placeholder = 'Brief description of the image';
  mediaAltInput.className = 'w-full p-2 border border-gray-300 rounded';

  const helpText = document.createElement('p');
  helpText.className = 'text-xs text-gray-500 mt-1';
  helpText.textContent = 'Must be a publicly accessible image URL';

  mediaGroup.appendChild(mediaLabel);
  mediaGroup.appendChild(mediaInput);
  mediaGroup.appendChild(mediaAltLabel);
  mediaGroup.appendChild(mediaAltInput);
  mediaGroup.appendChild(helpText);

  // Submit button
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'flex justify-between mt-6';

  const cancelButton = document.createElement('a');
  cancelButton.href = 'javascript:history.back()';
  cancelButton.className =
    'py-2 px-4 border border-gray-300 rounded hover:bg-gray-100';
  cancelButton.textContent = 'Cancel';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className =
    'bg-teal-900 text-white py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600';
  submitButton.textContent = 'Save Changes';

  buttonGroup.appendChild(cancelButton);
  buttonGroup.appendChild(submitButton);

  // Add form submission handler
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Saving...';

    try {
      // Get form data
      const postData = {
        title: form.querySelector('#title').value.trim(),
        body: form.querySelector('#body').value.trim(),
        tags: [],
      };

      // Add optional tags
      const bookTitle = form.querySelector('#bookTitle').value.trim();
      if (bookTitle) {
        postData.tags.push(`book:${bookTitle}`);
      }

      const bookAuthor = form.querySelector('#bookAuthor').value.trim();
      if (bookAuthor) {
        postData.tags.push(`author:${bookAuthor}`);
      }

      const rating = form.querySelector('#rating').value;
      if (rating) {
        postData.tags.push(`rating:${rating}`);
      }

      // Add media if provided
      const mediaUrl = form.querySelector('#mediaUrl').value.trim();
      if (mediaUrl) {
        postData.media = {
          url: mediaUrl,
          alt: form.querySelector('#mediaAlt').value.trim() || 'Post image',
        };
      }

      // Update the post
      await updatePost(post.id, postData);

      // Show success message
      showSuccess('Post updated successfully!', '#edit-message');

      // Redirect back to post view after short delay
      setTimeout(() => {
        window.location.href = `/feed/post.html?id=${post.id}`;
      }, 1500);
    } catch (error) {
      console.error('Error updating post:', error);
      showError(error.message || 'Failed to update post', '#edit-message');
      submitButton.disabled = false;
      submitButton.textContent = 'Save Changes';
    }
  });

  // Append all elements to form
  form.appendChild(titleGroup);
  form.appendChild(bodyGroup);
  form.appendChild(bookTitleGroup);
  form.appendChild(authorGroup);
  form.appendChild(ratingGroup);
  form.appendChild(mediaGroup);
  form.appendChild(buttonGroup);

  // Add form to container
  container.appendChild(form);
}

function createFormGroup(id, labelText, type, value = '') {
  const formGroup = document.createElement('div');
  formGroup.className = 'mb-4';

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.className = 'block text-gray-700';
  label.textContent = labelText;

  let input;
  if (type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 5;
  } else {
    input = document.createElement('input');
    input.type = type;
  }

  input.id = id;
  input.name = id;
  input.value = value;
  input.className = 'w-full p-2 border border-gray-300 rounded';

  formGroup.appendChild(label);
  formGroup.appendChild(input);
  return formGroup;
}
