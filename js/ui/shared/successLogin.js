export function showSuccess(message, targetSelector) {
  const targetElement = document.querySelector(targetSelector);

  //clear existing content
  targetElement.textContent = '';

  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-success';
  alertDiv.setAttribute('role', 'alert');

  //create success text node
  const successText = document.createTextNode(
    'Successfully logged in! If you are not forwarded in 10 sec, Please '
  );
  alertDiv.appendChild(successText);

  //create login link
  const loginLink = document.createElement('a');
  loginLink.href = '/profile/index.html';
  loginLink.textContent = 'click here.';
  loginLink.className = 'text-blue-600 hover:text-blue-800 underline';
  alertDiv.appendChild(loginLink);

  //add to DOM
  targetElement.appendChild(alertDiv);
}
