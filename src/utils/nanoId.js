import { customAlphabet } from 'nanoid';

const nanoId = () => {
  const nanoid4 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 4);
  return nanoid4();
};

export default nanoId;
