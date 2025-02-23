console.log('Hello world');
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';
import { generatePosts } from '../../ui/posts/generatePosts.js';

//NB! the API-Keys should be inside a .env (environment file) that's inside a .gitignore file!
const NOROFF_API_KEY = 'abbd249d-0114-4f05-a472-6c6ea04997b9';

async function fetchPosts() {
  try {
    const accessToken = getFromLocalStorage('accessToken');
    console.log(accessToken);
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': NOROFF_API_KEY,
      },
    };
    const response = await fetch(
      `${AUTH_ENDPOINTS.posts}?_author=true&_reactions=true&_comments=true`,
      fetchOptions
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

export async function initializePosts() {
  try {
    const posts = await fetchPosts();
    generatePosts(posts);
  } catch (error) {
    console.error('Error initializing posts:', error);
  }
}
