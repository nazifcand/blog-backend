import { createHash } from 'crypto';

const textToHash = (value: string): string => {
  const md5Key = createHash('md5').update(value).digest('hex');
  const sha1Key = createHash('sha1').update(md5Key).digest('hex');
  return sha1Key;
};

export default textToHash;
