import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

interface PasswordHashSettings {
  salt: string;
  iterations: number;
  keylen: number;
  digest: string;
}

interface PasswordHash {
  key: string;
  settings: PasswordHashSettings;
}

const KEYLEN = 63;
const ITERATIONS = 666;
const apbkdf2 = promisify(pbkdf2);

const hashInternal = async (password: string, settings: PasswordHashSettings) => {
  const s = settings;
  const buf = await apbkdf2(password, s.salt, s.iterations, s.keylen, s.digest);
  return buf.toString('base64');
};

const toHash = async (password: string): Promise<PasswordHash> => {
  const salt = randomBytes(12).toString('base64');
  const settings = {
    salt,
    iterations: ITERATIONS,
    keylen: KEYLEN,
    digest: 'sha512',
  };
  const key = await hashInternal(password, settings);
  return {
    key,
    settings
  };
};

const isValidPassword = async (password: string, hash: PasswordHash): Promise<boolean> => {
  const key = await hashInternal(password, hash.settings);
  return key == hash.key;
}

export { PasswordHash, toHash, isValidPassword };

