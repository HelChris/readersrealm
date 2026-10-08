import { getProfile } from '../../api/profile/updateProfile.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';
import { generateProfile } from '../../ui/profile/generateProfile.js';

export async function initializeProfilePage() {
  const username = getFromLocalStorage('username');
  const container = document.querySelector('#profile-container');

  if (!container) {
    return;
  }

  if (!username) {
    container.textContent = 'Please sign in to view your profile.';
    return;
  }

  const fallbackProfile = {
    name: username,
    bio: getFromLocalStorage('profileBio'),
    avatar: { url: getFromLocalStorage('profileAvatarUrl') },
  };
  const savedBooks = getSavedBooks();
  generateProfile(fallbackProfile, savedBooks, removeBook);

  try {
    const profile = await getProfile(username);
    generateProfile(profile, getSavedBooks(), removeBook);
  } catch (error) {
    console.error('Unable to load profile:', error);
  }
}

function removeBook(bookUrl) {
  const remainingBooks = getSavedBooks().filter((url) => url !== bookUrl);
  localStorage.setItem('favoriteBooks', JSON.stringify(remainingBooks));
  initializeProfilePage();
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