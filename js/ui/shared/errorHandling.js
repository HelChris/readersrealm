export function showError(error, targetSelector) {
  const targetElement = document.querySelector(targetSelector);

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
