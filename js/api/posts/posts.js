// import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
// import { getFromLocalStorage } from '../../helpers/localStorage.js';
// import { generatePosts } from '../../ui/posts/generatePosts.js';
// import { sortPosts } from '../../helpers/postSorter.js';
// import { initializeFilters } from '../../events/posts/filterHandlers.js';
// import { NOROFF_API_KEY } from '../../constants/config.js';

// export async function searchPosts(searchTerm) {
//   try {
//     const accessToken = getFromLocalStorage('accessToken');
//     const response = await fetch(
//       `${AUTH_ENDPOINTS.posts}/search?q=${searchTerm}&_author=true&_reactions=true&_comments=true`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'X-Noroff-API-Key': NOROFF_API_KEY,
//         },
//       }
//     );
//     const json = await response.json();
//     return json.data;
//   } catch (error) {
//     console.error('Search error:', error);
//     return [];
//   }
// }

// export async function fetchPostById(id) {
//   try {
//     const accessToken = getFromLocalStorage('accessToken');
//     const response = await fetch(
//       `${AUTH_ENDPOINTS.posts}/${id}?_author=true&_reactions=true&_comments=true`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'X-Noroff-API-Key': NOROFF_API_KEY,
//         },
//       }
//     );

//     if (!response.ok) throw new Error('Failed to fetch post');

//     const json = await response.json();
//     return json.data;
//   } catch (error) {
//     console.error(`Error fetching post with ID ${id}:`, error);
//     return null;
//   }
// }

// export async function fetchPosts() {
//   try {
//     const accessToken = getFromLocalStorage('accessToken');
//     const fetchOptions = {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'X-Noroff-API-Key': NOROFF_API_KEY,
//       },
//     };
//     const response = await fetch(
//       `${AUTH_ENDPOINTS.posts}?_author=true&_reactions=true&_comments=true`,
//       fetchOptions
//     );
//     const json = await response.json();
//     return json.data;
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return [];
//   }
// }

// export async function initializePosts() {
//   try {
//     const posts = await fetchPosts();
//     const sortedPosts = sortPosts(posts, 'newest');
//     generatePosts(sortedPosts);
//     initializeFilters(posts);
//   } catch (error) {
//     console.error('Error initializing posts:', error);
//   }
// }

import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';
import { generatePosts } from '../../ui/posts/generatePosts.js';
import { sortPosts } from '../../helpers/postSorter.js';
import { initializeFilters } from '../../events/posts/filterHandlers.js';
import { NOROFF_API_KEY } from '../../constants/config.js';

/**
 * Searches for posts containing the specified search term
 *
 * @param {string} searchTerm - The term to search for in posts
 * @returns {Promise<Array>} A promise that resolves to an array of posts matching the search term
 *
 * @example
 * // Search for posts containing "javascript"
 * try {
 *   const matchingPosts = await searchPosts("javascript");
 *   console.log(`Found ${matchingPosts.length} posts matching "javascript"`);
 * } catch (error) {
 *   console.error("Search failed:", error.message);
 * }
 */
export async function searchPosts(searchTerm) {
  try {
    const accessToken = getFromLocalStorage('accessToken');
    const response = await fetch(
      `${AUTH_ENDPOINTS.posts}/search?q=${searchTerm}&_author=true&_reactions=true&_comments=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': NOROFF_API_KEY,
        },
      }
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export async function fetchPostById(id) {
  try {
    const accessToken = getFromLocalStorage('accessToken');
    const response = await fetch(
      `${AUTH_ENDPOINTS.posts}/${id}?_author=true&_reactions=true&_comments=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': NOROFF_API_KEY,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch post');

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
}

export async function fetchPosts() {
  try {
    const accessToken = getFromLocalStorage('accessToken');
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': NOROFF_API_KEY,
      },
    };
    const response = await fetch(
      `${AUTH_ENDPOINTS.posts}?_author=true&_reactions=true&_comments=true`,
      fetchOptions
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function initializePosts() {
  try {
    const posts = await fetchPosts();
    const sortedPosts = sortPosts(posts, 'newest');
    generatePosts(sortedPosts);
    initializeFilters(posts);
  } catch (error) {
    console.error('Error initializing posts:', error);
  }
}