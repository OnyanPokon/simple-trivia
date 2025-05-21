const illustrations = ['/illustration/abstract.jpg', '/illustration/paint.png', '/illustration/road.jpg'];

export const getRandomIllustration = () => {
  return illustrations[Math.floor(Math.random() * illustrations.length)];
};
