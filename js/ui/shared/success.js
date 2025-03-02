// /**
// * Displays a success message in the specified target element
// * @param {string} message - The success message to display
// * @param {string} targetSelector - CSS selector for the target element
// * @returns {void} - This function doesn't return anything
// * @example
// * // Display a success message in a specific container
// * showSuccess('Post created successfully!', '#create-post');
// */
export function showSuccess(message, targetSelector) {
  const targetElement = document.querySelector(targetSelector);

   if (!targetElement) {
     console.warn(`Target element not found: ${targetSelector}`);
     console.log(message); 
     return;
  }

  // Clear existing content
  targetElement.textContent = '';

  // Create alert container
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-success';
  alertDiv.setAttribute('role', 'alert');

  // Create success text node
  const successText = document.createTextNode(message);
  alertDiv.appendChild(successText);

  // Add to DOM
  targetElement.appendChild(alertDiv);

  // auto-hide after a few seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 5000); // Hide after 5 seconds
}
