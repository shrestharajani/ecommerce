export function setToLocalStorage(state) {
  try {
    const setCartItemsToLs = JSON.stringify(state);
    localStorage.setItem("CartItems", setCartItemsToLs);
  } catch (e) {
    console.warn(e);
  }
}

export function getFromLocalStorage() {
  try {
    const getCartItemsFromLs = localStorage.getItem("CartItems");
    if (getCartItemsFromLs === null) return undefined;
    return JSON.parse(getCartItemsFromLs);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
