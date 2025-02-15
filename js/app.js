import { validatePassword } from '/js/helpers/formValidation.mjs';
import { registerHandler } from './events/auth/registerHandler.mjs';

// document
//   .getElementById('new-post-button')
//   .addEventListener('click', function () {
//     document
//       .getElementById('create-post')
//       .scrollIntoView({ behavior: 'smooth' });
//   });

function router() {
  const pathname = window.location.pathname;
  console.log(pathname);

  switch (pathname) {
    case '/':
      console.log('Home');
      break;
    case '/index.html':
      console.log('Login page');
      break;
    case '/register/register.html':
    case '/register/':
      console.log('Register page');
      document.querySelector('form').onsubmit = validatePassword;
      registerHandler();
      break;
    case '/feed/index.html':
    case '/feed/':
      console.log('Feed');
      break;
    case '/profile/index.html':
    case '/profile/':
      console.log('Profile page');
      break;
    case '/register/termsofservice.html':
      console.log('Terms of service page');
      break;
  }
}

router();
