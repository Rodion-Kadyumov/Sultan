export const useClickOutside = (ref: any, callback: () => void) => {
  const eventHandler = (e: Event) => {
    if (e.target instanceof Element) {
      !ref?.current?.contains(e.target) && callback();
    }
  };

  document.removeEventListener("click", eventHandler);

  document.addEventListener("click", eventHandler);
};
