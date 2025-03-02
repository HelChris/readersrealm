import { createPostUrl } from '../../helpers/urlHandling.js';

// generates the more complex post with more details for the single post page
export function generatePostElement(post) {
  const postElement = document.createElement('article');
  postElement.className = 'bg-white p-4 rounded-lg shadow flex flex-col h-full';

  // Header with author info
  const headerDiv = document.createElement('div');
  headerDiv.className = 'flex items-center mb-3';

  // Author avatar
  const authorImg = document.createElement('img');
  authorImg.src = post.author?.avatar?.url || '/images/avatar-small.jpg';
  authorImg.alt = 'Profile Image';
  authorImg.className = 'w-16 h-16 rounded-full p-2';
  authorImg.onerror = function () {
    this.src = '/images/avatar-small.jpg';
  };

  // Author info
  const authorInfo = document.createElement('div');

  const authorName = document.createElement('p');
  authorName.className = 'font-medium';
  authorName.textContent = post.author?.name || 'Anonymous';

  // Date posted
  const datePosted = document.createElement('p');
  datePosted.className = 'text-xs text-gray-500';
  const createdDate = new Date(post.created);
  datePosted.textContent = createdDate.toLocaleDateString('en-GB');

  authorInfo.appendChild(authorName);
  authorInfo.appendChild(datePosted);

  headerDiv.appendChild(authorImg);
  headerDiv.appendChild(authorInfo);

  //post title (clickable to view full post with title in URL)
  const titleLink = document.createElement('a');
  // use helper to create a URL with both ID and title
  titleLink.href = createPostUrl(post.id, post.title);
  titleLink.className = 'post-link';

  // Post title
  const titleElement = document.createElement('h2');
  titleElement.className = 'text-xl font-bold mb-3';
  titleElement.textContent = post.title;

  titleLink.appendChild(titleElement);

  // Post image/media
  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'mb-4 flex-grow';

  if (post.media && post.media.url) {
    const mediaImg = document.createElement('img');
    mediaImg.src = post.media.url;
    mediaImg.alt = post.media.alt || 'Post image';
    mediaImg.className = 'w-full aspect-square object-cover rounded-md';

    mediaImg.onerror = function () {
      this.src = '../images/placeholder.jpg';
      this.alt = 'Image unavailable';
    };
    mediaContainer.appendChild(mediaImg);
  } else {
    // Post has no image, use placeholder directly
    const placeholderImg = document.createElement('img');
    placeholderImg.src = '../images/placeholder.jpg';
    placeholderImg.alt = 'No image available';
    placeholderImg.className = 'w-full aspect-square object-cover rounded-md';

    mediaContainer.appendChild(placeholderImg);
  }

  // Likes count
  const likesCount = document.createElement('div');
  likesCount.className = 'flex items-center text-gray-600 mb-3';

  const heartIcon = document.createElement('span');
  heartIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         class="w-5 h-5 text-teal-500 mr-1" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  `;

  const likesText = document.createElement('span');
  likesText.textContent = `${post._count.reactions || 0} ${
    post._count.reactions === 1 ? 'Like' : 'Likes'
  }`;

  likesCount.appendChild(heartIcon);
  likesCount.appendChild(likesText);

  // View button
  const viewButtonContainer = document.createElement('div');
  viewButtonContainer.className = 'mt-auto pt-3';

  const viewButton = document.createElement('button');
  viewButton.className =
    'w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 view-post-button';
  viewButton.textContent = 'View Post';
  viewButton.dataset.postId = post.id;

  //click event to navigate to the post page with title in URL
  viewButton.addEventListener('click', function () {
    window.location.href = createPostUrl(post.id, post.title);
  });

  viewButtonContainer.appendChild(viewButton);

  // Assemble the card in the correct order
  postElement.appendChild(headerDiv);
  postElement.appendChild(titleLink);
  postElement.appendChild(mediaContainer);
  postElement.appendChild(likesCount);
  postElement.appendChild(viewButtonContainer);

  return postElement;
}
