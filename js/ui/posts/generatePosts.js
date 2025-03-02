//create simplified post cards for the post feed::
import { generatePostElement } from '../posts/generatePost.js';

export function generatePosts(posts) {
  const postsList = document.getElementById('postsList');
  if (!postsList) return;

  postsList.innerHTML = '';

  if (!posts || posts.length === 0) {
    const noPostsMessage = document.createElement('p');
    noPostsMessage.className = 'text-center text-gray-500 my-8';
    noPostsMessage.textContent = 'No posts available';
    postsList.appendChild(noPostsMessage);
    return;
  }

  posts.forEach((post) => {
    const postElement = generatePostElement(post);
    postsList.appendChild(postElement);
  });
}
