export const getDateByNow = () => {
  const now = new Date();

  return `${now.getFullYear()}-${getStr(now.getMonth() + 1)}-${getStr(now.getDate())}`;
};

const getStr = (num: number) => (num < 10 ? `0${num}` : num);
