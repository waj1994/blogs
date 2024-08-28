const throttle = (fn, delay) => {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...arguments);
        timer = null;
      }, delay);
    }
  };
};
export default throttle;
