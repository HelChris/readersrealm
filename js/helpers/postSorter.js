//sorts the post by newest/oldest drop down menu
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
