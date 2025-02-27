export function initHeartReactions() {
  // Use event delegation to handle all heart clicks in the document
  document.addEventListener('click', function (event) {
    // Find if the click was on a heart button or its child elements
    const heartButton = event.target.closest('.heart-button');

    if (heartButton) {
      const postId = heartButton.dataset.postId;
      const isLiked = heartButton.dataset.liked === 'true';

      // Toggle the heart state
      toggleHeartState(heartButton, !isLiked);

      // Update the like count
      updateLikeCount(postId, !isLiked);

      // Call the API to update the server
      updateReactionOnServer(postId, !isLiked);
    }
  });
}

/**
 * Toggle the visual state of a heart button
 * @param {HTMLElement} heartButton - The heart button element
 * @param {boolean} isLiked - Whether the heart should be filled or empty
 */
function toggleHeartState(heartButton, isLiked) {
  // Update the data attribute
  heartButton.dataset.liked = isLiked.toString();

  // Get the SVG element
  const svg = heartButton.querySelector('svg');

  if (svg) {
    // Update fill attribute
    svg.setAttribute('fill', isLiked ? 'currentColor' : 'none');

    // Update classes for color
    if (isLiked) {
      svg.classList.add('text-teal-500');
      svg.classList.remove('text-gray-500');
    } else {
      svg.classList.add('text-gray-500');
      svg.classList.remove('text-teal-500');
    }
  }
}

/**
 * Update the like count text for a post
 * @param {string} postId - The ID of the post
 * @param {boolean} isLiking - Whether the user is adding or removing a like
 */
function updateLikeCount(postId, isLiking) {
  // Find the likes count element for this post
  const likesCountElement = document.querySelector(
    `.likes-count[data-post-id="${postId}"]`
  );

  if (likesCountElement) {
    // Get current count from text
    const currentText = likesCountElement.textContent;
    const match = currentText.match(/(\d+)/);

    if (match) {
      const currentCount = parseInt(match[1]);
      const newCount = isLiking
        ? currentCount + 1
        : Math.max(0, currentCount - 1);

      // Update text
      likesCountElement.textContent = `${newCount} ${
        newCount === 1 ? 'Like' : 'Likes'
      }`;
    }
  }
}

/**
 * Send the reaction update to the server
 * @param {string} postId - The ID of the post
 * @param {boolean} isLiking - Whether the user is adding or removing a like
 */
async function updateReactionOnServer(postId, isLiking) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    const endpoint = isLiking
      ? `/api/posts/${postId}/react`
      : `/api/posts/${postId}/unreact`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update reaction status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating reaction:', error);
  }
}

/**
 * Create a heart icon button with proper data attributes
 * @param {Object} post - The post object
 * @returns {HTMLElement} The heart button element
 */
export function createHeartButton(post) {
  // Check if the current user has reacted
  const currentUser = JSON.parse(localStorage.getItem('profile'))?.name;
  const hasUserReacted = post.reactions?.some((reaction) =>
    reaction.reactors.includes(currentUser)
  );

  // Create the button element
  const heartButton = document.createElement('button');
  heartButton.className = 'heart-button focus:outline-none';
  heartButton.dataset.postId = post.id;
  heartButton.dataset.liked = hasUserReacted ? 'true' : 'false';

  // Set the SVG for the heart
  heartButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="${hasUserReacted ? 'currentColor' : 'none'}"
         class="w-6 h-6 ${
           hasUserReacted
             ? 'text-teal-500'
             : 'text-gray-500 hover:text-teal-500'
         }"
         stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  `;

  return heartButton;
}

/**
 * Create a likes count element with proper data attributes
 * @param {Object} post - The post object
 * @returns {HTMLElement} The likes count element
 */
export function createLikesCount(post) {
  const likesCount = document.createElement('span');
  likesCount.className = 'likes-count text-gray-600 ml-1';
  likesCount.dataset.postId = post.id;
  likesCount.textContent = `${post._count?.reactions || 0} ${
    post._count?.reactions === 1 ? 'Like' : 'Likes'
  }`;

  return likesCount;
}
