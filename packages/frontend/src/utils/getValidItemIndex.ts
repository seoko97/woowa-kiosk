export const getValidItemIndex = <T>(arr: T[], current: T, keys: (keyof T)[]) => {
  if (!keys.length) {
    return -1;
  }

  return arr.findIndex((prev) => keys.some((key) => prev[key] === current[key]));
};
