export const useWindowResize = (
  callback: (width: number, height: number) => void
) => {
  const eventHandler = () => {
    callback(window.innerWidth, window.innerHeight);
  };

  window.removeEventListener("resize", eventHandler);

  window.addEventListener("resize", eventHandler);
};
