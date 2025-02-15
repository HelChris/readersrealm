import { register } from '../../api/auth/registerapicall.js';
import { showError } from '../../ui/shared/errorHandling.js';
import { showSuccess } from '../../ui/shared/successHandling.js';

export function registerHandler() {}
console.log(registerHandler);

const form = document.querySelector('#registerForm');
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

  if (data.bio.trim() === '') {
    delete data.bio;
  }

  if (data.avatarUrl.trim() === '') {
    delete data.avatarUrl;
  } else {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s avatar`,
    };
    delete data.avatarUrl;
  }
  console.log(data);

  const fieldset = form.querySelector('fieldset');

  try {
    fieldset.disabled = true;
    await register(data);
    showSuccess('', '#message');
    form.reset();
  } catch (error) {
    console.error(error);
    showError(error, '#message');
  } finally {
    fieldset.disabled = false;
  }
}
