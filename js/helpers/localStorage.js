export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
//Add error checks to these functions!!
export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

// EXPORT THESE TO THE LOGIN.JS FILE!! =)
