// animateElement.ts

const animateElement = (
  element: string,
  animation: string,
  prefix: string = "animate__"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element) as HTMLElement;

    // Check if node exists
    if (!node) {
      reject(new Error("Element not found"));
      return;
    }

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: AnimationEvent) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
};

export default animateElement;
