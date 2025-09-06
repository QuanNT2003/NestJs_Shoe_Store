import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    return bcrypt.compareSync(plainPassword, hashPassword);
  } catch (error) {
    console.log(error);
  }
};
