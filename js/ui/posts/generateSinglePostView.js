import { updateUrlWithTitle } from '../../helpers/urlHandling.js';
import { doesPostBelongToUser } from '../../helpers/user.js';
import { deletePost } from '../../api/posts/deletePost.js';

export function generateSinglePostView(post, container) {
  if (!post || !container) return;

  //update the URL to include the post title
  updateUrlWithTitle(post.id, post.title);

  // Clear container
  container.innerHTML = '';

  // Create back link
  const backButtonContainer = document.createElement('div');
  backButtonContainer.className = 'mb-6';

  const backLink = document.createElement('a');
  backLink.href = '/feed/';
  backLink.className =
    'flex items-center text-teal-600 hover:text-teal-800 back-to-feed-button cursor-pointer';

  const backArrow = document.createElement('span');
  backArrow.className = 'mr-2';
  backArrow.innerHTML = '&larr;';

  backLink.appendChild(backArrow);
  backLink.appendChild(document.createTextNode('Back to Feed'));

  backButtonContainer.appendChild(backLink);

  // Author section
  const authorSection = document.createElement('div');
  authorSection.className = 'flex items-center mb-6';

  const authorImg = document.createElement('img');
  authorImg.src = post.author?.avatar?.url || '/images/avatar-small.jpg';
  authorImg.alt = 'Profile Image';
  authorImg.className = 'w-16 h-16 rounded-full p-2';
  authorImg.onerror = function () {
    this.src = '/images/avatar-small.jpg';
  };

  const authorInfo = document.createElement('div');

  const authorName = document.createElement('p');
  authorName.className = 'font-medium text-lg';
  authorName.textContent = post.author?.name || 'Anonymous';

  const datePosted = document.createElement('p');
  datePosted.className = 'text-gray-500';
  const createdDate = new Date(post.created);
  datePosted.textContent = `Posted on ${createdDate.toLocaleDateString(
    'en-GB'
  )}`;

  authorInfo.appendChild(authorName);
  authorInfo.appendChild(datePosted);

  authorSection.appendChild(authorImg);
  authorSection.appendChild(authorInfo);

  // Post title
  const titleElement = document.createElement('h1');
  titleElement.className = 'text-3xl font-bold mb-4';
  titleElement.textContent = post.title;

  // Post body
  const bodyElement = document.createElement('div');
  bodyElement.className = 'prose max-w-none mb-6';

  const bodyText = document.createElement('p');
  bodyText.className = 'mb-6';
  bodyText.textContent = post.body;

  bodyElement.appendChild(bodyText);

  // Media section
  if (post.media && post.media.url) {
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'mb-6';

    const mediaImg = document.createElement('img');
    mediaImg.src = post.media.url;
    mediaImg.alt = post.media.alt || 'Post image';
    mediaImg.className = 'max-w-full rounded-lg mx-auto';
    mediaImg.onerror = function () {
      this.src = '/images/placeholder.jpg';
      this.alt = 'Image unavailable';
    };

    mediaContainer.appendChild(mediaImg);
    bodyElement.appendChild(mediaContainer);
  }

  const bookTag = post.tags?.find((tag) => tag.startsWith('book:'));
  if (bookTag) {
    const bookSection = document.createElement('div');
    bookSection.className =
      'mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100';

    const bookTitle = document.createElement('h3');
    bookTitle.className = 'text-lg font-semibold mb-2';
    bookTitle.textContent = 'Book Review';

    const bookName = document.createElement('p');
    bookName.className = 'text-gray-700';
    bookName.innerHTML = `<strong>Title:</strong> ${bookTag
      .replace('book:', '')
      .trim()}`;

    bookSection.appendChild(bookTitle);
    bookSection.appendChild(bookName);

    // Rating section (using tags)
    const ratingTag = post.tags?.find((tag) => tag.startsWith('rating:'));
    if (ratingTag) {
      const rating = parseInt(ratingTag.replace('rating:', ''));

      const ratingElement = document.createElement('p');
      ratingElement.className = 'mt-2';

      const ratingLabel = document.createElement('strong');
      ratingLabel.textContent = 'Rating: ';

      const ratingStars = document.createElement('span');
      ratingStars.className = 'text-yellow-500';
      ratingStars.textContent = '★'.repeat(rating);

      const emptyStars = document.createElement('span');
      emptyStars.className = 'text-gray-300';
      emptyStars.textContent = '☆'.repeat(5 - rating);

      ratingElement.appendChild(ratingLabel);
      ratingElement.appendChild(ratingStars);
      ratingElement.appendChild(emptyStars);

      bookSection.appendChild(ratingElement);
    }

    bodyElement.appendChild(bookSection);
  }

  // Add edit and delete buttons
  const isOwner = doesPostBelongToUser(post.author?.name);
  if (isOwner) {
    const actionButtons = document.createElement('div');
    actionButtons.className = 'flex justify-end space-x-2 mb-4';

    // Edit button
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

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className =
      'bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 flex items-center';
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete
    `;

    // Add delete functionality
    deleteButton.addEventListener('click', async () => {
      const confirmDelete = confirm(
        'Are you sure you want to delete this post?'
      );
      if (confirmDelete) {
        try {
          await deletePost(post.id);
          // Redirect to feed after successful deletion
          window.location.href = '/feed/';
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('Failed to delete post. Please try again.');
        }
      }
    });

    actionButtons.appendChild(editButton);
    actionButtons.appendChild(deleteButton);
    bodyElement.appendChild(actionButtons);
  }

  // Likes count display (static, above reactions section)
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

  bodyElement.appendChild(likesCount);

  // Interactive Reactions section (for clicking)
  const reactionsSection = document.createElement('div');
  reactionsSection.className =
    'flex items-center space-x-2 mb-6 border-t border-b border-gray-200 py-4';

  const reactionButton = document.createElement('button');
  reactionButton.className = 'flex items-center space-x-1 reaction-button';
  reactionButton.dataset.postId = post.id;

  // Check if the current user has reacted
  const currentUser = JSON.parse(localStorage.getItem('profile'))?.name;
  const hasUserReacted = post.reactions?.some((reaction) =>
    reaction.reactors.includes(currentUser)
  );

  const reactionHeartIcon = document.createElement('span');
  // Use a simpler heart icon for the interactive button
  reactionHeartIcon.innerHTML = hasUserReacted
    ? '<svg class="w-6 h-6 text-teal-500 fill-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>'
    : '<svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>';

  const buttonText = document.createElement('span');
  buttonText.textContent = hasUserReacted ? 'Liked' : 'Like';

  reactionButton.appendChild(reactionHeartIcon);
  reactionButton.appendChild(buttonText);

  reactionsSection.appendChild(reactionButton);

  // Comments section
  const commentsSection = document.createElement('div');
  commentsSection.className = 'mb-6';

  const commentsTitle = document.createElement('h3');
  commentsTitle.className = 'text-lg font-semibold mb-4';
  commentsTitle.textContent = `Comments (${post._count.comments})`;

  const commentsList = document.createElement('div');
  commentsList.className = 'space-y-4 mb-4';
  commentsList.id = 'comments-container';

  // Add existing comments if available
  if (post.comments && post.comments.length > 0) {
    post.comments.forEach((comment) => {
      const commentItem = document.createElement('div');
      commentItem.className = 'p-3 bg-gray-50 rounded-lg';

      const commentHeader = document.createElement('div');
      commentHeader.className = 'flex items-center mb-2';

      const commentAuthor = document.createElement('span');
      commentAuthor.className = 'font-medium';
      commentAuthor.textContent =
        comment.author?.name || comment.owner || 'Anonymous';

      const commentDate = document.createElement('span');
      commentDate.className = 'text-xs text-gray-500 ml-2';
      const commentCreatedDate = new Date(comment.created);
      commentDate.textContent = commentCreatedDate.toLocaleDateString('en-GB');

      commentHeader.appendChild(commentAuthor);
      commentHeader.appendChild(commentDate);

      const commentBody = document.createElement('p');
      commentBody.className = 'text-gray-700';
      commentBody.textContent = comment.body;

      commentItem.appendChild(commentHeader);
      commentItem.appendChild(commentBody);

      commentsList.appendChild(commentItem);
    });
  } else {
    const noComments = document.createElement('p');
    noComments.className = 'text-gray-500 italic';
    noComments.textContent = 'No comments yet. Be the first to comment!';
    commentsList.appendChild(noComments);
  }

  // Add comment form
  const commentForm = document.createElement('div');
  commentForm.className = 'mt-4';

  const commentInputContainer = document.createElement('div');
  commentInputContainer.className = 'space-x-2';

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Your comment here..';
  commentInput.className =
    'flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent';
  commentInput.id = 'comment-input';

  const commentButton = document.createElement('button');
  commentButton.className =
    'bg-teal-600 text-white px-4 py-2 mt-2 rounded hover:bg-teal-700 comment-button';
  commentButton.textContent = 'Add';
  commentButton.dataset.postId = post.id;

  commentInputContainer.appendChild(commentInput);
  commentInputContainer.appendChild(commentButton);

  commentForm.appendChild(commentInputContainer);

  commentsSection.appendChild(commentsTitle);
  commentsSection.appendChild(commentsList);
  commentsSection.appendChild(commentForm);

  // Assemble the post view
  const postContainer = document.createElement('div');
  postContainer.className =
    'max-w-4xl mx-auto m-4 bg-white p-6 rounded-lg shadow';

  postContainer.appendChild(backButtonContainer);
  postContainer.appendChild(authorSection);
  postContainer.appendChild(titleElement);
  postContainer.appendChild(bodyElement);
  postContainer.appendChild(reactionsSection);
  postContainer.appendChild(commentsSection);

  container.appendChild(postContainer);

  return container;
}
