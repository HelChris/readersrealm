import { validatePassword } from './helpers/validatePassword.js';
import { registerHandler } from './events/auth/registerHandler.mjs';
import { loginHandler } from './api/auth/login.js';
import { initializePosts } from './api/auth/posts.js';



function router() {
  const pathname = window.location.pathname;
  console.log(pathname);

  switch (pathname) {
    case '/':
      console.log('Home');
      loginHandler();
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
      document.addEventListener('DOMContentLoaded', () => {
        initializePosts();
      });
      document
        .getElementById('new-post-button')
        .addEventListener('click', function () {
          document
            .getElementById('create-post')
            .scrollIntoView({ behavior: 'smooth' });
        });
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
