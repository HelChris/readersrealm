// import { registerHandler } from './events/auth/registerHandler.js';
// import { loginHandler } from './api/auth/login.js';
// import { initializeFeedPage } from './helpers/initializationFeedPage.js';
// import { initializeSinglePostPage } from './helpers/initializationSinglePostPage.js';
// import { initializeEditPostPage } from './ui/posts/generateEditPostForm.js';
// import { logout } from './helpers/auth.js';

// function router() {
//   const pathname = window.location.pathname;

//   //event listener to logout button on all pages that have it
//   const logoutButton = document.getElementById('logout-button');
//   if (logoutButton) {
//     logoutButton.addEventListener('click', (e) => {
//       e.preventDefault();
//       logout();
//     });
//   }

//   switch (pathname) {
//     case '/':
//     case '/index.html':
//       loginHandler();

//       break;
//     case '/register/register.html':
//       registerHandler();
//       break;
//     case '/feed/index.html':
//     case '/feed/':
//       document.addEventListener('DOMContentLoaded', () => {
//         initializeFeedPage();
//       });
//       break;
//     case '/feed/post.html':
//       document.addEventListener('DOMContentLoaded', () => {
//         initializeSinglePostPage();
//       });
//       break;
//     case '/feed/editpost.html':
//       document.addEventListener('DOMContentLoaded', () => {
//         initializeEditPostPage();
//       });
//       break;
//     case '/profile/index.html':
//     case '/profile/':
//       break;
//     case '/register/termsofservice.html':
//       break;
//   }
// }

// router();

import { registerHandler } from './events/auth/registerHandler.js';
import { loginHandler } from './api/auth/login.js';
import { initializeFeedPage } from './helpers/initializationFeedPage.js';
import { initializeSinglePostPage } from './helpers/initializationSinglePostPage.js';
import { initializeEditPostPage } from './ui/posts/generateEditPostForm.js';
import { logout } from './helpers/auth.js';

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
  const pathname = window.location.pathname;

  //event listener to logout button on all pages that have it
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }

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
    case '/feed/editpost.html':
      document.addEventListener('DOMContentLoaded', () => {
        initializeEditPostPage();
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
