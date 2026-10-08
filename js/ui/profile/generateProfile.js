export function generateProfile(profile, favoriteBooks = [], onRemoveBook) {
  const container = document.querySelector('#profile-container');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  const section = document.createElement('section');
  section.className = 'w-full bg-white p-6 rounded-lg shadow-lg';

  const profileHeader = document.createElement('div');
  profileHeader.className = 'items-center space-x-4';

  const details = document.createElement('div');
  const name = document.createElement('h1');
  name.className = 'text-2xl font-bold pt-4 pb-4';
  name.textContent = profile.name;

  const bio = document.createElement('p');
  bio.className = 'max-w-xs';
  bio.textContent = profile.bio || 'Tell us about yourself.';

  const updateLink = document.createElement('a');
  updateLink.href = './profileform.html';
  updateLink.className =
    'mt-2 inline-flex items-center bg-teal-900 text-white py-2 px-4 rounded-md hover:bg-teal-600';
  updateLink.textContent = 'Update Profile';

  details.append(name, bio, updateLink);
  if (profile.avatar?.url) {
    const avatar = document.createElement('img');
    avatar.src = profile.avatar.url;
    avatar.alt = profile.avatar.alt || `${profile.name} profile image`;
    avatar.className = 'pl-4 pt-4 w-24 rounded-full';
    avatar.onerror = () => avatar.remove();
    profileHeader.appendChild(avatar);
  }
  profileHeader.appendChild(details);

  const counts = document.createElement('div');
  counts.className = 'mt-6';
  counts.innerHTML = `
    <h3 class="text-xl font-bold mb-4">Followers / Following</h3>
    <div class="flex space-x-8">
      <div><h4 class="text-lg font-semibold">Followers</h4><p id="followersCount" class="text-gray-600"></p></div>
      <div><h4 class="text-lg font-semibold">Following</h4><p id="followingCount" class="text-gray-600 mb-4"></p></div>
    </div>`;
  counts.querySelector('#followersCount').textContent = profile._count?.followers || 0;
  counts.querySelector('#followingCount').textContent = profile._count?.following || 0;

  const booksSection = document.createElement('article');
  booksSection.className =
    'w-full max-w-full min-w-[min(100%,18rem)] mx-auto my-auto rounded-lg p-1 bg-orange-200 border-orange-50 border-8 shadow-md';

  const booksHeading = document.createElement('h2');
  booksHeading.className = 'text-2xl font-medium pt-2 text-center';
  booksHeading.textContent = 'Favorite Books';

  const booksGrid = document.createElement('div');
  booksGrid.className =
    'p-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,14rem))] justify-center gap-6';

  favoriteBooks.forEach((url, index) => {
    const bookCard = document.createElement('div');
    bookCard.className =
      'w-full bg-orange-100 p-4 rounded-lg border-orange-200 border-2 shadow-md';

    const bookImage = document.createElement('img');
    bookImage.src = url;
    bookImage.alt = `Favorite book ${index + 1}`;
      bookImage.className = 'w-full h-48 object-contain rounded-md mb-4 bg-white';
    bookImage.onerror = () => bookCard.remove();

    bookCard.appendChild(bookImage);
      if (onRemoveBook) {
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className =
          'w-full bg-red-700 text-white py-1 px-2 rounded hover:bg-red-800';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => onRemoveBook(url));
        bookCard.appendChild(removeButton);
      }
    booksGrid.appendChild(bookCard);
  });

  booksSection.append(booksHeading, booksGrid);
  section.append(profileHeader, counts, booksSection);
  container.appendChild(section);
}