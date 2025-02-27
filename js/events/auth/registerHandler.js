import { register } from '../../api/auth/registerapicall.js';
import { showError } from '../../ui/shared/errorHandling.js';
import { showSuccess } from '../../ui/shared/successRegistrationHandling.js';

export function registerHandler() {}
console.log(registerHandler);

const form = document.querySelector('#registerForm');
if (form) {
  form.addEventListener('submit', submitForm);
}

async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
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
