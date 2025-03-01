import { registerHandler } from './events/auth/registerHandler.js';
import { loginHandler } from './api/auth/login.js';
import { initializeFeedPage } from './helpers/initializationFeedPage.js';
import { initializeSinglePostPage } from './helpers/initializationSinglePostPage.js';

function router() {
  const pathname = window.location.pathname;
  console.log(pathname);

  switch (pathname) {
    case '/':
    case '/index.html':
      loginHandler();

      break;
    case '/register/register.html':
      registerHandler();
      break;
    case '/feed/index.html':
    case '/feed/':
      document.addEventListener('DOMContentLoaded', () => {
        initializeFeedPage();
      });

      break;
    case '/feed/post.html':
      document.addEventListener('DOMContentLoaded', () => {
        initializeSinglePostPage();
      });
      break;
    case '/profile/index.html':
    case '/profile/':
      break;
    case '/register/termsofservice.html':
      break;
  }
}

router();
