const randInterval = async (cb, min, max) => {
  let timeout;

  const startInterval = () => {
    const timeoutCb = () => {
      cb();
      startInterval();
    };
    const randomMs = Math.floor(Math.random() * (max - min) + min);
    timeout = setTimeout(timeoutCb, randomMs);
  };

  startInterval();

  return {
    clear: () => clearTimeout(timeout),
  };
};

module.exports = {
  randInterval
};
