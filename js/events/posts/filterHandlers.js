import { sortPosts } from '../../helpers/postSorter.js';
import { searchPosts } from '../../api/posts/posts.js';
import { generatePosts } from '../../ui/posts/generatePosts.js';

let allPosts = []; //store all posts

export function initializeFilters(posts) {
  allPosts = posts;
  setupFilterListeners();
}

function setupFilterListeners() {
  const searchInput = document.querySelector(
    'input[placeholder="Search posts... (try author:name, book:title)"'
  );
  const sortSelect = document.getElementById('sort');

  if (searchInput) {
    let timeoutId;
    searchInput.addEventListener('input', async (event) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const searchTerm = event.target.value;
        // Check if we're searching for author using the format "author:name"
        if (searchTerm.trim().toLowerCase().startsWith('author:')) {
          const authorName = searchTerm.trim().substring(7).toLowerCase(); // Get the name after "author:"

          // Filter posts by author name
          const filteredPosts = allPosts.filter((post) =>
            post.author?.name?.toLowerCase().includes(authorName)
          );

          generatePosts(
            sortPosts(filteredPosts, document.getElementById('sort').value)
          );
        }
        // Regular search
        else if (searchTerm.trim()) {
          const searchResults = await searchPosts(searchTerm);
          generatePosts(
            sortPosts(searchResults, document.getElementById('sort').value)
          );
        }
        // Empty search - show all posts
        else {
          generatePosts(
            sortPosts(allPosts, document.getElementById('sort').value)
          );
        }
      }, 300);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (event) => {
      const sortType = event.target.value;
      const searchTerm = document.querySelector(
        'input[placeholder="Search posts... (try author:name, book:title)"]'
      );

      // Keep the author filter applied when changing sort
      if (searchTerm.trim().toLowerCase().startsWith('author:')) {
        const authorName = searchTerm.trim().substring(7).toLowerCase();
        const filteredPosts = allPosts.filter((post) =>
          post.author?.name?.toLowerCase().includes(authorName)
        );
        generatePosts(sortPosts(filteredPosts, sortType));
      } else {
        generatePosts(sortPosts(allPosts, sortType));
      }
    });
  }
}
