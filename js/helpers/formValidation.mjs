export function validatePassword() {
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;
  var errorMessage = document.getElementById('password-error');

  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.id = 'password-error';
    errorMessage.className = 'error';
    document.getElementById('confirm-password').after(errorMessage);
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    return false;
  } else {
    errorMessage.textContent = '';
  }
  return true;
}
