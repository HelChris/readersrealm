import { NOROFF_API_KEY } from '../../constants/config.js';
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';

async function requestProfile(username, method = 'GET', profile = null) {
  const accessToken = getFromLocalStorage('accessToken');

  if (!accessToken) {
    throw new Error('You must be logged in to view your profile');
  }

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': NOROFF_API_KEY,
    },
  };

  if (profile) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(profile);
  }

  const response = await fetch(`${AUTH_ENDPOINTS.profiles}/${encodeURIComponent(username)}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Profile update failed');
  }

  return json.data;
}

export function getProfile(username) {
  return requestProfile(username);
}

export function updateProfile(profile) {
  const username = getFromLocalStorage('username');

  if (!username) {
    throw new Error('Your username could not be found');
  }

  return requestProfile(username, 'PUT', profile);
}