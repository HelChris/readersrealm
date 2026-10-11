import { registerHandler } from './events/auth/registerHandler.js';
import { loginHandler } from './api/auth/login.js';
import { initializeFeedPage } from './helpers/initializationFeedPage.js';
import { initializeSinglePostPage } from './helpers/initializationSinglePostPage.js';
import { initializeEditPostPage } from './ui/posts/generateEditPostForm.js';
import { logout } from './helpers/auth.js';
import { initializeProfilePage } from './events/profile/profileHandler.js';
import {
  initializeProfileUpdatePage,
} from './events/profile/updateProfileHandler.js';
/**
 * Routes to the appropriate handler based on the current URL path
 *
 * This function determines which page is currently being viewed based on the URL path,
 * sets up common functionality like logout buttons, and initializes the appropriate
 * page-specific handlers and event listeners.
 *
 * @returns {void}
 *
 * @example
 * // Call the router function when the application loads
 * document.addEventListener('DOMContentLoaded', () => {
 *   router();
 *   console.log('Application routing initialized');
 * });
 */
function router() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (document.querySelector('#registerForm')) {
    registerHandler();
    return;
  }

  const runWhenReady = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  };

  //event listener to logout button on all pages that have it
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }

  if (pathname.endsWith('/profile/profileform.html')) {
    document.addEventListener('DOMContentLoaded', () => {
      initializeProfileUpdatePage();
    });
    return;
  }

  if (pathname.endsWith('/profile/index.html') || pathname.endsWith('/profile')) {
    runWhenReady(() => initializeProfilePage());
    return;
  }

  if (pathname.endsWith('/feed/index.html') || pathname.endsWith('/feed')) {
    runWhenReady(() => initializeFeedPage());
    return;
  }

  switch (pathname) {
    case '/':
    case '/index.html':
      loginHandler();
      break;
    case '/register':
    case '/register/register.html':
      registerHandler();
      break;
    case '/feed':
      runWhenReady(() => initializeFeedPage());
      break;
    case '/feed/post.html':
      document.addEventListener('DOMContentLoaded', () => {
        initializeSinglePostPage();
      });
      break;
    case '/feed/editpost.html':
      document.addEventListener('DOMContentLoaded', () => {
        initializeEditPostPage();
      });
      break;
    case '/profile':
      document.addEventListener('DOMContentLoaded', () => {
        initializeProfilePage();
      });
      break;
    case '/register/termsofservice.html':
      break;
  }
}

router();
