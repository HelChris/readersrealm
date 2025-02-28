import { validatePassword } from './helpers/validatePassword.js';
import { registerHandler } from './events/auth/registerHandler.js';
import { loginHandler } from './api/auth/login.js';
// import { initializePosts } from './api/posts/posts.js';
import { initializeFeedPage } from './helpers/initializationFeedPage.js';
import { initializeSinglePostPage } from './helpers/initializationSinglePostPage.js';

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
        initializeFeedPage();
      });
      break;
    case '/feed/post.html':
      console.log('Single Post');
      document.addEventListener('DOMContentLoaded', () => {
        initializeSinglePostPage();
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
