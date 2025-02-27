export function setupFeedEventListeners() {
  const postsContainer = document.getElementById('postsList');

  if (postsContainer) {
    // Delegate clicks on the view post buttons
    postsContainer.addEventListener('click', (event) => {
      const viewButton = event.target.closest('.view-post-button');
      if (viewButton) {
        const postId = viewButton.dataset.postId;
        if (postId) {
          // Navigate to single post page
          window.location.href = `/feed/post.html?id=${postId}`;
        }
      }
    });
  }
}
