import * as bcrypt from 'bcryptjs';

const SALTROUNDS = 10;

export const encryptedPassword = (password: string): string => {
  password = bcrypt.hashSync(password, SALTROUNDS);

  return password;
};

export const decryptionPassword = async (
  password: string,
  enctypted: string,
): Promise<boolean> => {
  const isPassword = await bcrypt.compare(password, enctypted);

  return isPassword;
};
