import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';
import { NOROFF_API_KEY } from '../../constants/config.js';
import { showError } from '../../ui/shared/errorHandling.js';
/**
 * Sets up all event listeners for the single post page
 *
 * This function initializes event handlers for back button navigation,
 * post reactions (likes), and comment submissions on a single post view.
 *
 * @returns {void}
 *
 * @example
 * // Initialize all single post page event listeners
 * document.addEventListener('DOMContentLoaded', () => {
 *   setupSinglePostEventListeners();
 *   console.log('Single post event listeners initialized');
 * });
 */
export function setupSinglePostEventListeners() {
  // Back button handler
  const backButton = document.querySelector('.back-to-feed-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.href = '/post.html?id=${postId}';
    });
  }

  // Reaction button handler
  const reactionButton = document.querySelector('.reaction-button');
  if (reactionButton) {
    reactionButton.addEventListener('click', async () => {
      const postId = reactionButton.dataset.postId;
      reactionButton.disabled = true;

      try {
        const reactionData = await handleReaction(postId);
        if (reactionData) updateReactionUI(reactionData);
      } finally {
        reactionButton.disabled = false;
      }
    });
  }

  // Comment button handler
  const commentButton = document.querySelector('.comment-button');
  if (commentButton) {
    commentButton.addEventListener('click', () => {
      const postId = commentButton.dataset.postId;
      const commentText = document.getElementById('comment-input').value;
      handleComment(postId, commentText);
    });
  }
}

async function handleReaction(postId) {
  try {
    const accessToken = getFromLocalStorage('accessToken');
    const reaction = encodeURIComponent('👍');
    const response = await fetch(
      `${AUTH_ENDPOINTS.posts}/${postId}/react/${reaction}`,
      {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': NOROFF_API_KEY,
      },
      }
    );

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const apiMessage = errorBody?.errors?.[0]?.message || errorBody?.message;
      throw new Error(apiMessage || 'We could not save your reaction.');
    }

    const json = await response.json().catch(() => null);
    return json?.data || null;
  } catch (error) {
    console.error('Error handling reaction:', error);
    showError(error, '#post-container');
    return null;
  }
}

function updateReactionUI(reactionData) {
  const reactionCount = (reactionData.reactions || []).reduce(
    (total, reaction) => total + reaction.count,
    0
  );
  const likesText = document.querySelector('.likes-count-text');
  const reactionButton = document.querySelector('.reaction-button');
  const buttonText = reactionButton?.querySelector('.reaction-button-text');

  if (likesText) {
    likesText.textContent = `${reactionCount} ${
      reactionCount === 1 ? 'Like' : 'Likes'
    }`;
  }

  if (buttonText) {
    buttonText.textContent = buttonText.textContent === 'Like' ? 'Liked' : 'Like';
  }
}

async function handleComment(postId, commentText) {
  if (!commentText.trim()) return; // Don't submit empty comments

  try {
    const accessToken = getFromLocalStorage('accessToken');
    const response = await fetch(`${AUTH_ENDPOINTS.posts}/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': NOROFF_API_KEY,
      },
      body: JSON.stringify({
        body: commentText,
      }),
    });

    if (!response.ok) throw new Error('Failed to add comment');

    // Reload the page to show the new comment
    window.location.reload();
  } catch (error) {
    console.error('Error adding comment:', error);
    showError(error, '#post-container');
  }
}
