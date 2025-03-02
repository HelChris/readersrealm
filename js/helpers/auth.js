/**
 * Logs out the user by clearing localStorage and redirecting to login page
 */
export function logout() {
  // Clear all items from localStorage
  localStorage.clear();

  // Redirect to login page
  window.location.href = '/index.html';
}
