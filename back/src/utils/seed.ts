export const getDailySeed = (): number => {
  const date = new Date();
  return (
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  );
};

export const getRandomSeed = (): number => {
  const date = new Date();
  return Math.floor(Math.random() * 1000000) + date.getTime();
};
