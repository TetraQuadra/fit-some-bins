export function checkInput(input) {
  if (!input || !Array.isArray(input) || input.length < 1) {
    alert("Invalid input data");
    return false;
  }
  return true;
}

export function generateBlocks(amount, minSize, maxSize) {
  return Array.from({ length: amount }, () => ({
    width: getRandomInt(minSize, maxSize),
    height: getRandomInt(minSize, maxSize),
  }));
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
