import { updateProfile } from '../../api/profile/updateProfile.js';
import { addToLocalStorage } from '../../helpers/localStorage.js';
import { showError } from '../../ui/shared/errorHandling.js';
import { showSuccess } from '../../ui/shared/success.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';

const PROFILE_URL = './index.html';

export function initializeProfileUpdatePage() {
  const form = document.querySelector('#profileUpdateForm');
  const addBookButton = document.querySelector('#addBookBtn');
  const bookInputs = document.querySelector('#bookInputs');

  if (!form || !addBookButton || !bookInputs) {
    return;
  }

  form.reset();
  form.querySelector('#name').value = getFromLocalStorage('username') || '';

  addBookButton.addEventListener('click', () => {
    if (bookInputs.querySelectorAll('input').length < 5) {
      addBookInput(bookInputs);
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const name = form.querySelector('#name').value.trim();
    const bio = form.querySelector('#bio').value.trim();
    const avatarUrl = form.querySelector('#avatarUrl').value.trim();
    const newBookUrls = [...bookInputs.querySelectorAll('input')]
      .map((input) => input.value.trim())
      .filter(Boolean);
    const existingBooks = getSavedBooks();
    const bookUrls = [...new Set([...existingBooks, ...newBookUrls])].slice(0, 5);

    const profile = { name, bio };
    if (avatarUrl) {
      profile.avatar = { url: avatarUrl, alt: 'Profile avatar' };
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Saving...';

    try {
      await updateProfile(profile);
      addToLocalStorage('username', name);
      addToLocalStorage('profileBio', bio);
      addToLocalStorage('profileAvatarUrl', avatarUrl);
      addToLocalStorage('favoriteBooks', JSON.stringify(bookUrls));
      form.reset();
      showSuccess('Profile updated successfully!', '#message');
      window.location.href = PROFILE_URL;
    } catch (error) {
      showError(error.message || 'Failed to update profile', '#message');
      submitButton.disabled = false;
      submitButton.textContent = 'Update Profile';
    }
  });
}

function addBookInput(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mb-2';

  const input = document.createElement('input');
  input.type = 'url';
  input.name = 'bookUrls[]';
  input.placeholder = 'https://example.com/book-cover.jpg';
  input.className = 'form-control w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600';

  wrapper.appendChild(input);
  container.appendChild(wrapper);
}

function getSavedBooks() {
  try {
    const savedBooks = JSON.parse(getFromLocalStorage('favoriteBooks') || '[]');
    return Array.isArray(savedBooks) ? savedBooks : [];
  } catch (error) {
    console.error('Unable to read saved books:', error);
    return [];
  }
}
