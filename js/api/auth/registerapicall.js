import { AUTH_ENDPOINTS } from '../../constants/endpoints.js';
import { addToLocalStorage } from '../../helpers/localStorage.js';
/**
 * Registers a new user by sending credentials to the server
 *
 * @param {Object} user - The user registration data
 * @param {string} user.name - The user's name
 * @param {string} user.email - The user's email address
 * @param {string} user.password - The user's password
 * @returns {Promise<Object>} A promise that resolves to the server response with user data
 * @throws {Error} If the registration fails or server returns an error
 *
 * @example
 * // Register a new user
 * try {
 *   const userData = await register({
 *     name: "John Doe",
 *     email: "john@example.com",
 *     password: "securePassword123"
 *   });
 *   console.log("Registration successful:", userData);
 * } catch (error) {
 *   console.error("Registration failed:", error.message);
 * }
 */
export async function register(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(AUTH_ENDPOINTS.register, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Oh no, registration failed');
  }

  // Store user data in localStorage after successful registration
  const { accessToken, name, email } = json.data;
  addToLocalStorage('accessToken', accessToken);
  addToLocalStorage('username', name);
  addToLocalStorage('email', email);

  return json;
}
