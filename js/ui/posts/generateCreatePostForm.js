// //
// // Generates and returns the create post form
// // @returns {HTMLElement} The create post form container element
// //
// export function generateCreatePostForm() {
//   // Create form container
//   const formContainer = document.createElement('div');
//   formContainer.className =
//     'bg-white p-4 rounded shadow mt-8 w-full max-w-lg mx-auto';
//   formContainer.id = 'create-post';

//   // Create form
//   const form = document.createElement('form');
//   form.id = 'createPostForm';

//   // Create heading
//   const heading = document.createElement('h2');
//   heading.className = 'text-2xl font-bold mb-4 text-balance text-center';
//   heading.textContent = 'Create a new post or book review:';

//   //create message container right after title
//   const formMessages = document.createElement('div');
//   formMessages.id = 'form-messages';
//   formMessages.className = 'mb-4';
//   form.appendChild(formMessages);

//   // Create fieldset
//   const fieldset = document.createElement('fieldset');

//   // Add form elements to fieldset
//   fieldset.appendChild(
//     createFormGroup('title', 'Post Title', 'text', 'Enter title of your post')
//   );
//   fieldset.appendChild(
//     createFormGroup('body', 'Your Thoughts', 'textarea', 'Share your thoughts')
//   );
//   fieldset.appendChild(
//     createFormGroup(
//       'bookTitle',
//       'Book Title (Optional)',
//       'text',
//       'Add a book title?'
//     )
//   );
//   fieldset.appendChild(
//     createFormGroup('bookAuthor', 'Author (Optional)', 'text', 'Add author?')
//   );
//   fieldset.appendChild(createRatingSelect());
//   fieldset.appendChild(
//     createFormGroup('coverImage', 'Book Cover Image (Optional)', 'file')
//   );
//   fieldset.appendChild(createMediaUrlGroup());
//   fieldset.appendChild(createSubmitButton());

//   // Assemble form
//   form.appendChild(heading);
//   form.appendChild(fieldset);
//   formContainer.appendChild(form);

//   return formContainer;
// }

// // **
// // * Creates a form group with label and input
// // * @param {string} id - The input id and name
// // * @param {string} labelText - The label text
// // * @param {string} type - The input type (text, textarea, etc.)
// // * @param {string} [placeholder] - Optional placeholder text
// // * @returns {HTMLElement} The form group div
// // */
// function createFormGroup(id, labelText, type, placeholder = '') {
//   const formGroup = document.createElement('div');
//   formGroup.className = 'mb-4';

//   const label = document.createElement('label');
//   label.setAttribute('for', id);
//   label.className = 'block text-gray-700';
//   label.textContent = labelText;

//   formGroup.appendChild(label);

//   let input;
//   if (type === 'textarea') {
//     input = document.createElement('textarea');
//   } else {
//     input = document.createElement('input');
//     input.type = type;
//   }

//   input.id = id;
//   input.name = id;

//   if (placeholder) {
//     input.placeholder = placeholder;
//   }

//   input.className = 'w-full p-2 border border-gray-300 rounded';

//   formGroup.appendChild(input);
//   return formGroup;
// }

// // /**
// // * Creates the rating select dropdown
// // * @returns {HTMLElement} The form group div containing the rating select
// // */
// function createRatingSelect() {
//   const formGroup = document.createElement('div');
//   formGroup.className = 'mb-4';

//   const label = document.createElement('label');
//   label.setAttribute('for', 'rating');
//   label.className = 'block text-gray-700';
//   label.textContent = 'Rating (Optional)';

//   const select = document.createElement('select');
//   select.id = 'rating';
//   select.name = 'rating';
//   select.className = 'w-full p-2 border border-gray-300 rounded';

//   // Add options
//   const options = [
//     { value: '', text: 'Select rating' },
//     { value: '1', text: '1 - Poor' },
//     { value: '2', text: '2 - Fair' },
//     { value: '3', text: '3 - Good' },
//     { value: '4', text: '4 - Very Good' },
//     { value: '5', text: '5 - Excellent' },
//   ];

//   options.forEach((optionData) => {
//     const option = document.createElement('option');
//     option.value = optionData.value;
//     option.textContent = optionData.text;
//     select.appendChild(option);
//   });

//   formGroup.appendChild(label);
//   formGroup.appendChild(select);
//   return formGroup;
// }

// // /**
// // * Creates the media URL and alt text input group
// // * @returns {HTMLElement} The form group div for media URL inputs
// // */
// function createMediaUrlGroup() {
//   const formGroup = document.createElement('div');
//   formGroup.className = 'mb-4';

//   const mainLabel = document.createElement('label');
//   mainLabel.className = 'block text-gray-700';
//   mainLabel.textContent = 'Or provide an image URL';

//   const inputContainer = document.createElement('div');
//   inputContainer.className = 'space-y-2';

//   // URL input
//   const urlGroup = document.createElement('div');

//   const urlLabel = document.createElement('label');
//   urlLabel.setAttribute('for', 'mediaUrl');
//   urlLabel.className = 'block text-sm text-gray-600';
//   urlLabel.textContent = 'Image URL';

//   const urlInput = document.createElement('input');
//   urlInput.type = 'url';
//   urlInput.id = 'mediaUrl';
//   urlInput.name = 'mediaUrl';
//   urlInput.placeholder = 'https://example.com/image.jpg';
//   urlInput.className = 'w-full p-2 border border-gray-300 rounded';

//   urlGroup.appendChild(urlLabel);
//   urlGroup.appendChild(urlInput);

//   // Alt text input
//   const altGroup = document.createElement('div');

//   const altLabel = document.createElement('label');
//   altLabel.setAttribute('for', 'mediaAlt');
//   altLabel.className = 'block text-sm text-gray-600';
//   altLabel.textContent = 'Image Description (Alt Text)';

//   const altInput = document.createElement('input');
//   altInput.type = 'text';
//   altInput.id = 'mediaAlt';
//   altInput.name = 'mediaAlt';
//   altInput.placeholder = 'Brief description of the image';
//   altInput.className = 'w-full p-2 border border-gray-300 rounded';

//   altGroup.appendChild(altLabel);
//   altGroup.appendChild(altInput);

//   // Help text
//   const helpText = document.createElement('p');
//   helpText.className = 'text-xs text-gray-500 mt-1';
//   helpText.textContent = 'Must be a publicly accessible image URL';

//   // Assemble media URL group
//   inputContainer.appendChild(urlGroup);
//   inputContainer.appendChild(altGroup);

//   formGroup.appendChild(mainLabel);
//   formGroup.appendChild(inputContainer);
//   formGroup.appendChild(helpText);

//   return formGroup;
// }

// // /**
// // * Creates the submit button
// // * @returns {HTMLElement} The submit button
// // */
// function createSubmitButton() {
//   const button = document.createElement('button');
//   button.type = 'submit';
//   button.className =
//     'w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600';
//   button.textContent = 'Post';
//   return button;
// }

/**
 * Generates and returns the create post form
 *
 * @returns {HTMLElement} The create post form container element
 *
 * @example
 * // Add form to a container element
 * const container = document.getElementById('form-container');
 * container.appendChild(generateCreatePostForm());
 * console.log('Post creation form generated and added to the page');
 */
export function generateCreatePostForm() {
  // Create form container
  const formContainer = document.createElement('div');
  formContainer.className =
    'bg-white p-4 rounded shadow mt-8 w-full max-w-lg mx-auto';
  formContainer.id = 'create-post';

  // Create form
  const form = document.createElement('form');
  form.id = 'createPostForm';

  // Create heading
  const heading = document.createElement('h2');
  heading.className = 'text-2xl font-bold mb-4 text-balance text-center';
  heading.textContent = 'Create a new post or book review:';

  //create message container right after title
  const formMessages = document.createElement('div');
  formMessages.id = 'form-messages';
  formMessages.className = 'mb-4';
  form.appendChild(formMessages);

  // Create fieldset
  const fieldset = document.createElement('fieldset');

  // Add form elements to fieldset
  fieldset.appendChild(
    createFormGroup('title', 'Post Title', 'text', 'Enter title of your post')
  );
  fieldset.appendChild(
    createFormGroup('body', 'Your Thoughts', 'textarea', 'Share your thoughts')
  );
  fieldset.appendChild(
    createFormGroup(
      'bookTitle',
      'Book Title (Optional)',
      'text',
      'Add a book title?'
    )
  );
  fieldset.appendChild(
    createFormGroup('bookAuthor', 'Author (Optional)', 'text', 'Add author?')
  );
  fieldset.appendChild(createRatingSelect());
  fieldset.appendChild(
    createFormGroup('coverImage', 'Book Cover Image (Optional)', 'file')
  );
  fieldset.appendChild(createMediaUrlGroup());
  fieldset.appendChild(createSubmitButton());

  // Assemble form
  form.appendChild(heading);
  form.appendChild(fieldset);
  formContainer.appendChild(form);

  return formContainer;
}

/**
 * Creates a form group with label and input
 *
 * @param {string} id - The input id and name
 * @param {string} labelText - The label text
 * @param {string} type - The input type (text, textarea, etc.)
 * @param {string} [placeholder] - Optional placeholder text
 * @returns {HTMLElement} The form group div
 */
function createFormGroup(id, labelText, type, placeholder = '') {
  const formGroup = document.createElement('div');
  formGroup.className = 'mb-4';

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.className = 'block text-gray-700';
  label.textContent = labelText;

  formGroup.appendChild(label);

  let input;
  if (type === 'textarea') {
    input = document.createElement('textarea');
  } else {
    input = document.createElement('input');
    input.type = type;
  }

  input.id = id;
  input.name = id;

  if (placeholder) {
    input.placeholder = placeholder;
  }

  input.className = 'w-full p-2 border border-gray-300 rounded';

  formGroup.appendChild(input);
  return formGroup;
}

/**
 * Creates the rating select dropdown
 *
 * @returns {HTMLElement} The form group div containing the rating select
 */
function createRatingSelect() {
  const formGroup = document.createElement('div');
  formGroup.className = 'mb-4';

  const label = document.createElement('label');
  label.setAttribute('for', 'rating');
  label.className = 'block text-gray-700';
  label.textContent = 'Rating (Optional)';

  const select = document.createElement('select');
  select.id = 'rating';
  select.name = 'rating';
  select.className = 'w-full p-2 border border-gray-300 rounded';

  // Add options
  const options = [
    { value: '', text: 'Select rating' },
    { value: '1', text: '1 - Poor' },
    { value: '2', text: '2 - Fair' },
    { value: '3', text: '3 - Good' },
    { value: '4', text: '4 - Very Good' },
    { value: '5', text: '5 - Excellent' },
  ];

  options.forEach((optionData) => {
    const option = document.createElement('option');
    option.value = optionData.value;
    option.textContent = optionData.text;
    select.appendChild(option);
  });

  formGroup.appendChild(label);
  formGroup.appendChild(select);
  return formGroup;
}

/**
 * Creates the media URL and alt text input group
 *
 * @returns {HTMLElement} The form group div for media URL inputs
 */
function createMediaUrlGroup() {
  const formGroup = document.createElement('div');
  formGroup.className = 'mb-4';

  const mainLabel = document.createElement('label');
  mainLabel.className = 'block text-gray-700';
  mainLabel.textContent = 'Or provide an image URL';

  const inputContainer = document.createElement('div');
  inputContainer.className = 'space-y-2';

  // URL input
  const urlGroup = document.createElement('div');

  const urlLabel = document.createElement('label');
  urlLabel.setAttribute('for', 'mediaUrl');
  urlLabel.className = 'block text-sm text-gray-600';
  urlLabel.textContent = 'Image URL';

  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.id = 'mediaUrl';
  urlInput.name = 'mediaUrl';
  urlInput.placeholder = 'https://example.com/image.jpg';
  urlInput.className = 'w-full p-2 border border-gray-300 rounded';

  urlGroup.appendChild(urlLabel);
  urlGroup.appendChild(urlInput);

  // Alt text input
  const altGroup = document.createElement('div');

  const altLabel = document.createElement('label');
  altLabel.setAttribute('for', 'mediaAlt');
  altLabel.className = 'block text-sm text-gray-600';
  altLabel.textContent = 'Image Description (Alt Text)';

  const altInput = document.createElement('input');
  altInput.type = 'text';
  altInput.id = 'mediaAlt';
  altInput.name = 'mediaAlt';
  altInput.placeholder = 'Brief description of the image';
  altInput.className = 'w-full p-2 border border-gray-300 rounded';

  altGroup.appendChild(altLabel);
  altGroup.appendChild(altInput);

  // Help text
  const helpText = document.createElement('p');
  helpText.className = 'text-xs text-gray-500 mt-1';
  helpText.textContent = 'Must be a publicly accessible image URL';

  // Assemble media URL group
  inputContainer.appendChild(urlGroup);
  inputContainer.appendChild(altGroup);

  formGroup.appendChild(mainLabel);
  formGroup.appendChild(inputContainer);
  formGroup.appendChild(helpText);

  return formGroup;
}

/**
 * Creates the submit button
 *
 * @returns {HTMLElement} The submit button
 */
function createSubmitButton() {
  const button = document.createElement('button');
  button.type = 'submit';
  button.className =
    'w-full bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600';
  button.textContent = 'Post';
  return button;
}