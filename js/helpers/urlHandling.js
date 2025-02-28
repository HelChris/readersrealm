//generate s a URL-friendly slug from a post title
export function generateSlug(title) {
  if (!title) return '';

  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function createPostUrl(id, title) {
  const slug = generateSlug(title);
  return `/feed/post.html?id=${id}&title=${slug}`;
}

//extracts the post ID from the current URL
export function getPostIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

//update the URL with postID and title without reloading page
export function updateUrlWithTitle(id, title) {
  const newUrl = createPostUrl(id, title);

  window.history.pushState({ id, title }, title, newUrl);
}
