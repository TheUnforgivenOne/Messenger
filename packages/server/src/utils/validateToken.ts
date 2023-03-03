import jwt, { JwtPayload } from 'jsonwebtoken';
import UserRepository from '../DataAccessLayer/repositories/UserRepository';

const validateToken = async (token?: string) => {
  if (!token) throw new Error('Not Autorized');

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'easy_secret'
    ) as JwtPayload;

    const user = await UserRepository.getUserById(decodedToken.userId);
    if (!user) throw new Error('Token is not valid');

    return { user, userId: decodedToken.userId! };
  } catch (err) {
    throw new Error(err.message);
  }
};

export default validateToken;
