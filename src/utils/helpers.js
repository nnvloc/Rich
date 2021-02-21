export const duplicates = (arr) => {
  let hash = {};
  arr.forEach((item) => {
    if (!hash[item]) {
      hash[item] = 1;
    } else {
      hash[item]++;
    }
  });

  return Object.keys(hash).reduce(
    (result, key) => [...result, ...(hash[key] >= 2 ? [key] : [])],
    [],
  );
};
