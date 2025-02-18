console.log('Hello world');
import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';
import { generatePosts } from '../../ui/posts/generatePosts.js';

let displayContainer;

document.addEventListener('DOMContentLoaded', () => {
  displayContainer = document.getElementById('display-container');
  console.log(displayContainer);
});

//NB!! the API-Keys should be inside a .env (environment file) that's inside a .gitignore file!!
const NOROFF_API_KEY = 'abbd249d-0114-4f05-a472-6c6ea04997b9';

export async function fetchPosts() {
  try {
    const accessToken = getFromLocalStorage('accessToken');
    console.log(accessToken);
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': NOROFF_API_KEY,
      },
    };
    const response = await fetch(AUTH_ENDPOINTS.posts, fetchOptions);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  const posts = await fetchPosts();
  generatePosts(posts);
}

main();
