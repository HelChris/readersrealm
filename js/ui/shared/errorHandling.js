// **
// * Displays an error message in the specified target element
// * @param {string|Error} error - The error message or Error object to display
// * @param {string} targetSelector - CSS selector for the target element
// * @returns {void}
// * @example
// * // Display a simple string error
// * showError('Username is required', '#login-form');
// *
// * // Display an Error object
// * try {
// *   // Some code that might throw
// * } catch (error) {
// *   showError(error, '#error-container');
// * }
// */
export function showError(error, targetSelector) {
  const targetElement = document.querySelector(targetSelector);

  if (!targetElement) {
    console.warn(`Target element not found: ${targetSelector}`);
    return;
  }

  // clear existing content
  targetElement.textContent = '';

  //create alert container
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-error';
  alertDiv.setAttribute('role', 'alert');

  //create error text node
  const errorText = document.createTextNode(
    error instanceof Error ? error.message : error
  );
  alertDiv.appendChild(errorText);

  //add to DOM
  targetElement.appendChild(alertDiv);
}
