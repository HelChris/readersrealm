//sorts the post by newest/oldest/most likes drop down menu
export function sortPosts(posts, sortType) {
  if (!posts || posts.length === 0) return [];

  const sortedPosts = [...posts]; // Create copy to avoid mutating original

  switch (sortType.toLowerCase()) {
    case 'oldest':
      return sortedPosts.sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      );
    case 'most likes':
      return sortedPosts.sort(
        (a, b) => b._count.reactions - a._count.reactions
      );
    case 'newest':
    default:
      return sortedPosts.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
  }
}
