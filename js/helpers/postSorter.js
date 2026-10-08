/**
 * Sorts an array of posts based on creation date
 *
 * @param {Array} posts - Array of post objects to sort
 * @param {string} sortType - The sorting method ('newest' or 'oldest')
 * @returns {Array} A new sorted array of posts
 *
 * @example
 * // Sort posts with newest first
 * const posts = [
 *   { id: 1, title: "First post", created: "2023-01-15T12:00:00Z" },
 *   { id: 2, title: "Second post", created: "2023-02-20T14:30:00Z" }
 * ];
 * const newestFirst = sortPosts(posts, 'newest');
 * console.log(newestFirst[0].title); // "Second post"
 */
export function sortPosts(posts, sortType) {
  if (!posts || posts.length === 0) return [];

  const sortedPosts = [...posts]; // Create copy to avoid mutating original

  switch (sortType.toLowerCase()) {
    case 'oldest':
      return sortedPosts.sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      );
    case 'newest':
    default:
      return sortedPosts.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
  }
}
