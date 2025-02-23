export function createPostElement(post) {
  const postElement = document.createElement('article');
  postElement.className = 'bg-white p-4 rounded-lg shadow';

  // Profile section with author data
  const profileDiv = document.createElement('div');
  profileDiv.className = 'flex flex-row content-center';

  const profileImg = document.createElement('img');
  profileImg.src = post.author?.avatar?.url || '/images/avatar-small.jpg'; // Fallback if no avatar
  profileImg.alt = post.author?.avatar?.alt || 'Profile Image';
  profileImg.className = 'w-16 h-16 rounded-full';

  const nicknameP = document.createElement('p');
  nicknameP.className = 'p-2 content-center';
  nicknameP.textContent = post.author?.name || 'Anonymous';

  profileDiv.appendChild(profileImg);
  profileDiv.appendChild(nicknameP);

  // Title and body
  const titleH2 = document.createElement('h2');
  titleH2.className = 'text-xl font-bold';
  titleH2.textContent = post.title;

  const bodyP = document.createElement('p');
  bodyP.className = 'py-1';
  bodyP.textContent = post.body;

  // Book section (using tags if applicable)
  const bookTag = post.tags?.find((tag) => tag.startsWith('book:'));
  if (bookTag) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'flex pt-2';

    const bookLabel = document.createElement('p');
    bookLabel.className = 'font-medium';
    bookLabel.textContent = 'Book:';

    const bookTitleP = document.createElement('p');
    bookTitleP.className = 'pl-1';
    bookTitleP.textContent = bookTag.replace('book:', '').trim();

    bookDiv.appendChild(bookLabel);
    bookDiv.appendChild(bookTitleP);
    postElement.appendChild(bookDiv);
  }

  // Rating section (using tags)
  const ratingTag = post.tags?.find((tag) => tag.startsWith('rating:'));
  if (ratingTag) {
    const rating = parseInt(ratingTag.replace('rating:', ''));
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'flex pt-2';

    const ratingLabel = document.createElement('p');
    ratingLabel.className = 'font-medium';
    ratingLabel.textContent = 'Rating:';

    const ratingP = document.createElement('p');
    ratingP.className = 'pl-1';
    ratingP.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    ratingDiv.appendChild(ratingLabel);
    ratingDiv.appendChild(ratingP);
    postElement.appendChild(ratingDiv);
  }

  // Reactions section
  const likesDiv = document.createElement('div');
  likesDiv.className = 'flex justify-left items-center mt-2';

  const likeButton = document.createElement('button');
  likeButton.className = 'px-2 py-1 rounded flex items-center';
  likeButton.onclick = () => handleReaction(post.id, '❤️');

  // Check if the current user has reacted with any symbol
  const currentUser = JSON.parse(localStorage.getItem('profile'))?.name;
  const hasUserReacted = post.reactions?.some((reaction) =>
    reaction.reactors.includes(currentUser)
  );

  const likeIcon = document.createElement('svg');
  likeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  likeIcon.setAttribute('viewBox', '0 0 24 24');
  likeIcon.setAttribute('stroke-width', '1.5');
  likeIcon.setAttribute('stroke', 'currentColor');
  likeIcon.setAttribute('fill', hasUserReacted ? 'currentColor' : 'none');
  likeIcon.className = `w-5 h-5 ${
    hasUserReacted
      ? 'text-teal-500 fill-teal-500'
      : 'text-gray-500 hover:text-teal-500 hover:fill-teal-500'
  }`;

  const likePath = document.createElement('path');
  likePath.setAttribute('stroke-linecap', 'round');
  likePath.setAttribute('stroke-linejoin', 'round');
  likePath.setAttribute(
    'd',
    'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
  );

  likeIcon.appendChild(likePath);
  likeButton.appendChild(likeIcon);

  const likesP = document.createElement('p');
  likesP.className = 'ml-1';
  // Use the total reaction count from _count
  likesP.textContent = `${post._count.reactions} Likes`;

  likesDiv.appendChild(likeButton);
  likesDiv.appendChild(likesP);

  // Comment section
  const commentDiv = document.createElement('div');
  commentDiv.className = 'mt-4';

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  commentInput.className = 'w-full p-2 border border-gray-300 rounded';

  commentDiv.appendChild(commentInput);

  // Append all elements
  postElement.appendChild(profileDiv);
  postElement.appendChild(titleH2);
  postElement.appendChild(bodyP);
  postElement.appendChild(likesDiv);
  postElement.appendChild(commentDiv);

  return postElement;
}

// Helper function to handle reactions
async function handleReaction(postId, symbol) {
  try {
    const response = await fetch(`/social/posts/${postId}/react/${symbol}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to react to post');

    // Refresh the posts to show updated reaction count
    await refreshPosts();
  } catch (error) {
    console.error('Error handling reaction:', error);
  }
}

export function generatePosts(posts) {
  const postsList = document.getElementById('postsList');
  postsList.innerHTML = ''; // Clear existing posts

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsList.appendChild(postElement);
  });
}
