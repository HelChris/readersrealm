import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
//IMPORT LOCALSTORAGE FUNCTIONS FROM HELPERS!
import { addToLocalStorage } from '../../helpers/localStorage.js';

export async function login(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(AUTH_ENDPOINTS.login, options);
  const json = await response.json();
  const accessToken = json.data.accessToken;
  addToLocalStorage('accessToken', accessToken);

  console.log(json);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Oh no, login failed');
  }

  return json;
}

import { showError } from '../../ui/shared/errorHandling.js';
import { showSuccess } from '../../ui/shared/successLogin.js';

export function loginHandler() {}
console.log(loginHandler);

const form = document.querySelector('#login-form');
if (form) {
  form.addEventListener('submit', submitForm);
}

async function submitForm(event) {
  // stop the default behavior where the form is submitted and the page reloaded.
  event.preventDefault();

  // getting the HTML element that triggered the event:
  const form = event.target;

  // creating a new formData object. a way to easily construct a set of key/value pairs representing form fields and their values.
  const formData = new FormData(form);

  // converting the formData into a plain JavaScript object, transforms a list of key-value pairs into an object.
  const data = Object.fromEntries(formData);
  console.log(data);

  const fieldset = form.querySelector('fieldset');

  try {
    fieldset.disabled = true;
    await login(data);
    showSuccess('', '#message');
    form.reset();
    location.href = '/feed/index.html';
  } catch (error) {
    console.error(error);
    showError(error, '#message');
  } finally {
    fieldset.disabled = false;
  }
}
