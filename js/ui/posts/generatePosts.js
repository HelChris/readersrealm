export function createPostElement(post) {
  const postElement = document.createElement('article');
  postElement.className = 'bg-white p-4 rounded-lg shadow';

  const profileDiv = document.createElement('div');
  profileDiv.className = 'flex flex-row content-center';

  const profileImg = document.createElement('img');
  profileImg.src = '/images/avatar-small.jpg';
  profileImg.alt = 'Profile Image';
  profileImg.className = 'w-16 h-16 rounded-full';

  const nicknameP = document.createElement('p');
  nicknameP.className = 'p-2 content-center';
  nicknameP.textContent = post.nickname;

  profileDiv.appendChild(profileImg);
  profileDiv.appendChild(nicknameP);

  const titleH2 = document.createElement('h2');
  titleH2.className = 'text-xl font-bold';
  titleH2.textContent = post.title;

  const bodyP = document.createElement('p');
  bodyP.className = 'py-1';
  bodyP.textContent = post.body;

  const bookDiv = document.createElement('div');
  bookDiv.className = 'flex pt-2';

  const bookLabel = document.createElement('p');
  bookLabel.className = 'font-medium';
  bookLabel.textContent = 'Book:';

  const bookTitleP = document.createElement('p');
  bookTitleP.className = 'pl-1';
  bookTitleP.textContent = post.bookTitle;

  bookDiv.appendChild(bookLabel);
  bookDiv.appendChild(bookTitleP);

  const ratingDiv = document.createElement('div');
  ratingDiv.className = 'flex pt-2';

  const ratingLabel = document.createElement('p');
  ratingLabel.className = 'font-medium';
  ratingLabel.textContent = 'Rating:';

  const ratingP = document.createElement('p');
  ratingP.className = 'pl-1';
  ratingP.textContent = '★'.repeat(post.rating) + '☆'.repeat(5 - post.rating);

  ratingDiv.appendChild(ratingLabel);
  ratingDiv.appendChild(ratingP);

  const likesDiv = document.createElement('div');
  likesDiv.className = 'flex justify-left items-center mt-2';

  const likeButton = document.createElement('button');
  likeButton.className = 'px-2 py-1 rounded flex items-center';

  const likeIcon = document.createElement('svg');
  likeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  likeIcon.setAttribute('fill', 'none');
  likeIcon.setAttribute('viewBox', '0 0 24 24');
  likeIcon.setAttribute('stroke-width', '1.5');
  likeIcon.setAttribute('stroke', 'currentColor');
  likeIcon.className =
    'w-5 h-5 text-gray-500 hover:text-teal-500 hover:fill-teal-500 focus:text-teal-500 focus:fill-teal-500';

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
  likesP.textContent = `${post.likes} Likes`;

  likesDiv.appendChild(likeButton);
  likesDiv.appendChild(likesP);

  const commentDiv = document.createElement('div');
  commentDiv.className = 'mt-4';

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  commentInput.className = 'w-full p-2 border border-gray-300 rounded';

  commentDiv.appendChild(commentInput);

  postElement.appendChild(profileDiv);
  postElement.appendChild(titleH2);
  postElement.appendChild(bodyP);
  postElement.appendChild(bookDiv);
  postElement.appendChild(ratingDiv);
  postElement.appendChild(likesDiv);
  postElement.appendChild(commentDiv);

  return postElement;
}

export function generatePosts(posts) {
  const postsList = document.getElementById('postsList');
  postsList.innerHTML = ''; // Clear existing posts

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsList.appendChild(postElement);
  });
}
