import { getFromLocalStorage } from './localStorage.js';

export function doesPostBelongToUser(authorName) {
  const username = getFromLocalStorage('username');

  if (authorName === username) {
    return true;
  }
  return false;
}
