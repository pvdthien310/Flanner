module.exports = mergeObjectData = (target = {}, ...restObjects) => {
  restObjects.forEach((source = {}) => {
    Object.keys(source).forEach((key) => {
      if (target[key]) {
        target[key] = { ...target[key], ...source[key] };
      }
    });
  });
  return target;
};
