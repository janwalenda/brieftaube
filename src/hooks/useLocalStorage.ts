"use client"
export function useLocalStorage() {
  const get = (key: string) => {
    return localStorage.getItem(key);
  }

  const set = (key: string, value: string) => {
    localStorage.setItem(key, value);
  }

  const remove = (key: string) => {
    localStorage.removeItem(key);
  }

  const clear = () => {
    localStorage.clear();
  }

  const getAll = () => {
    return { ...localStorage };
  }

  return {
    get,
    set,
    remove,
    clear,
    getAll,
    length: (localStorage || []).length || 0
  }
}
