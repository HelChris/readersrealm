export function sortPosts(posts, sortType) {
  const sortedPosts = [...posts];

  switch (sortType.toLowerCase()) {
    case 'oldest':
      return sortedPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
    case 'most likes':
      return sortedPosts.sort((a, b) => b._count.reactions - a._count.reactions);
    case 'newest':
    default:
      return sortedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
  }
}