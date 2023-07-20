export const getRandomNumber = (min = 0, max = 10) => {
  const randomDecimal = Math.random();
  const scaledRandom = randomDecimal * (max - min + 1);
  const randomInteger = Math.floor(scaledRandom);

  return randomInteger + min;
};

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
};
