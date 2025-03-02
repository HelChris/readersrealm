// import { createPostUrl } from '../../helpers/urlHandling.js';
// import { doesPostBelongToUser } from '../../helpers/user.js';
// import { deletePost } from '../../api/posts/deletePost.js';

// // generates the more complex post with more details for the single post page

// export function generatePostElement(post) {
//   const postElement = document.createElement('article');
//   postElement.className = 'bg-white p-4 rounded-lg shadow flex flex-col h-full';

//   // Header with author info
//   const headerDiv = document.createElement('div');
//   headerDiv.className = 'flex items-center mb-3';

//   // Author avatar
//   const authorImg = document.createElement('img');
//   authorImg.src = post.author?.avatar?.url || '/images/avatar-small.jpg';
//   authorImg.alt = 'Profile Image';
//   authorImg.className = 'w-16 h-16 rounded-full p-2';
//   authorImg.onerror = function () {
//     this.src = '/images/avatar-small.jpg';
//   };

//   // Author info
//   const authorInfo = document.createElement('div');

//   const authorName = document.createElement('p');
//   authorName.className = 'font-medium';
//   authorName.textContent = post.author?.name || 'Anonymous';

//   // Date posted
//   const datePosted = document.createElement('p');
//   datePosted.className = 'text-xs text-gray-500';
//   const createdDate = new Date(post.created);
//   datePosted.textContent = createdDate.toLocaleDateString('en-GB');

//   authorInfo.appendChild(authorName);
//   authorInfo.appendChild(datePosted);

//   headerDiv.appendChild(authorImg);
//   headerDiv.appendChild(authorInfo);

//   //post title (clickable to view full post with title in URL)
//   const titleLink = document.createElement('a');
//   // use helper to create a URL with both ID and title
//   titleLink.href = createPostUrl(post.id, post.title);
//   titleLink.className = 'post-link';

//   // Post title
//   const titleElement = document.createElement('h2');
//   titleElement.className = 'text-xl font-bold mb-3';
//   titleElement.textContent = post.title;

//   titleLink.appendChild(titleElement);

//   // Post image/media
//   const mediaContainer = document.createElement('div');
//   mediaContainer.className = 'mb-4 flex-grow';

//   if (post.media && post.media.url) {
//     const mediaImg = document.createElement('img');
//     mediaImg.src = post.media.url;
//     mediaImg.alt = post.media.alt || 'Post image';
//     mediaImg.className = 'w-full aspect-square object-cover rounded-md';

//     mediaImg.onerror = function () {
//       this.src = '../images/placeholder.jpg';
//       this.alt = 'Image unavailable';
//     };
//     mediaContainer.appendChild(mediaImg);
//   } else {
//     // Post has no image, use placeholder directly
//     const placeholderImg = document.createElement('img');
//     placeholderImg.src = '../images/placeholder.jpg';
//     placeholderImg.alt = 'No image available';
//     placeholderImg.className = 'w-full aspect-square object-cover rounded-md';

//     mediaContainer.appendChild(placeholderImg);
//   }

//   // Likes count
//   const likesCount = document.createElement('div');
//   likesCount.className = 'flex items-center text-gray-600 mb-3';

//   const heartIcon = document.createElement('span');
//   heartIcon.innerHTML = `
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//          class="w-5 h-5 text-teal-500 mr-1" stroke-width="2">
//       <path stroke-linecap="round" stroke-linejoin="round"
//             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//     </svg>
//   `;

//   const likesText = document.createElement('span');
//   likesText.textContent = `${post._count.reactions || 0} ${
//     post._count.reactions === 1 ? 'Like' : 'Likes'
//   }`;

//   likesCount.appendChild(heartIcon);
//   likesCount.appendChild(likesText);

//   // View button
//   const viewButtonContainer = document.createElement('div');
//   viewButtonContainer.className = 'mt-auto pt-3';

//   const viewButton = document.createElement('button');
//   viewButton.className =
//     'w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 view-post-button';
//   viewButton.textContent = 'View Post';
//   viewButton.dataset.postId = post.id;

//   //click event to navigate to the post page with title in URL
//   viewButton.addEventListener('click', function () {
//     window.location.href = createPostUrl(post.id, post.title);
//   });

//   viewButtonContainer.appendChild(viewButton);

//   // Assemble the card
//   postElement.appendChild(headerDiv);
//   postElement.appendChild(titleElement);
//   postElement.appendChild(mediaContainer);

//   const isOwner = doesPostBelongToUser(post.author?.name);

//   if (isOwner) {
//     const editLink = document.createElement('a');
//     editLink.href = `/feed/edit.html?id=${post.id}`;
//     editLink.textContent = 'Edit post';
//     editLink.className = 'text-blue-500 hover:underline';

//     postElement.appendChild(editLink);

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete';
//     deleteButton.className =
//       'bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600';
//     deleteButton.dataset.postId = post.id;
//     postElement.appendChild(deleteButton);

//     deleteButton.addEventListener('click', async function () {
//       const id = this.dataset.postId;
//       const shouldDelete = confirm('Do you really want to delete this post?');
//       if (shouldDelete) {
//         await deletePost(id);
//         window.location.reload();
//       }
//     });
//   }

//   postElement.appendChild(likesCount);
//   postElement.appendChild(viewButtonContainer);

//   return postElement;
// }

import { createPostUrl } from '../../helpers/urlHandling.js';
import { doesPostBelongToUser } from '../../helpers/user.js';
import { deletePost } from '../../api/posts/deletePost.js';

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

  // Create action buttons for owner
  let actionButtons;
  const isOwner = doesPostBelongToUser(post.author?.name);

  if (isOwner) {
    // Create a container for action buttons
    actionButtons = document.createElement('div');
    actionButtons.className = 'flex justify-end w-full space-x-2 mb-3';

    // Edit button with SVG icon
    const editButton = document.createElement('a');
    editButton.href = `/feed/editpost.html?id=${post.id}`;
    editButton.className =
      'bg-teal-600 text-white py-1 px-3 rounded hover:bg-teal-700 flex items-center';
    editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      Edit
    `;

    // Delete button with SVG icon
    const deleteButton = document.createElement('button');
    deleteButton.className =
      'bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 flex items-center';
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete
    `;
    deleteButton.dataset.postId = post.id;

    // Add delete functionality
    deleteButton.addEventListener('click', async function () {
      const confirmDelete = confirm(
        'Are you sure you want to delete this post?'
      );
      if (confirmDelete) {
        try {
          await deletePost(post.id);
          // Redirect to feed after successful deletion
          window.location.reload();
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('Failed to delete post. Please try again.');
        }
      }
    });

    // Add buttons to container
    actionButtons.appendChild(editButton);
    actionButtons.appendChild(deleteButton);
  }

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
  // Add action buttons after the media container but before likes
  if (isOwner && actionButtons) {
    postElement.appendChild(actionButtons);
  }
  postElement.appendChild(likesCount);
  postElement.appendChild(viewButtonContainer);

  return postElement;
}
