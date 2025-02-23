export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
//Add error checks to these functions!!
export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}