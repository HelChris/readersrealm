import { createPost } from '../../api/posts/postsApi.js';
import { showError, showSuccess } from '../../ui/shared/errorHandling.js';

export async function handleCreatePostFormSubmit(form) {
  try {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Posting..';
    submitButton.disabled = true;

    //get form data
    const postData = getPostDataFromForm(form);

    //Validate form data
    if (!postData.title || !postData.body) {
      showError('Post title and content are required', '#create-post');
      resetSubmitButton(submitButton, originalButtonText);
      return;
    }

    //send the post data to the API
    const newPost = await createPost(postData);

    //handle successful post creation
    if (newPost) {
      //reset the form
      form.reset();

      //success message
      showSuccess('Your post has been published successfully!', '#create-post');

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  } catch (error) {
    console.error('Error creating post:', error);
    showError('Failed to create post. Please try again.', '#create-post');
  } finally {
    //reset the submit button
    resetSubmitButton(submitButton, originalButtonText);
  }
}

//get post data from the form fields
function getPostDataFromForm(form) {
  //basic post data
  const postData = {
    title: form.querySelector('#postTitle').value.trim(),
    body: form.querySelector('#thoughts').value.trim(),
    tags: [],
  };

  //add optional book-related tags if provided
  const bookTitle = form.querySelector('#bookTitle').value.trim();
  if (bookTitle) {
    postData.tags.push(`book:${bookTitle}`);
  }

  const author = form.querySelector('#author').value.trim();
  if (author) {
    postData.tags.push(`author:${author}`);
  }

  //add rating if selected
  const ratingSelect = form.querySelector('#rating');
  const selectedRating = ratingSelect.selectedIndex;
  if (selectedRating > 0) {
    //skip "select rating option
    const ratingValue = selectedRating; //1-5 based on index
    postData.tags.push(`rating:${ratingValue}`);
  }

  //handle image upload if selected
  const imageFile = form.querySelector('#coverImage').files[0];
  if (imageFile) {
    //prepare the object structure
    //actual handling file upload is in API call
    postData.media = {
      file: imageFile,
    };
  }

  return postData;
}

function resetSubmitButton(button, originalText) {
  button.textContent = originalText;
  button.disabled = false;
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
  const createPostForm = document.querySelector('#create-post form');
  if (createPostForm) {
    createPostForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleCreatePostFormSubmit(createPostForm);
    });
  }
});
