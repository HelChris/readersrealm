import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { getFromLocalStorage } from '../../helpers/localStorage.js';
import { NOROFF_API_KEY } from '../../constants/config.js';

export async function createPost(postData) {
  try {
    const accessToken = getFromLocalStorage('accessToken');
    const formData = new FormData();

    // Append post data to formData
    formData.append('title', postData.title);
    formData.append('body', postData.body);
    postData.tags.forEach((tag) => formData.append('tags', tag));
    if (postData.media && postData.media.file) {
      formData.append('media', postData.media.file);
    }

    const response = await fetch(AUTH_ENDPOINTS.posts, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': NOROFF_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

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
