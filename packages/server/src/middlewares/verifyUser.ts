import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserRepository from '../DataAccessLayer/repositories/UserRepository';
import createResponse from '../utils/createResponse';

const verifyUser: RequestHandler = async (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token)
    return res
      .status(401)
      .json(createResponse({ error: true, message: 'Not Autorized' }));

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'easy_secret'
    ) as JwtPayload;
    // TODO: Check token expiration

    const user = await UserRepository.getUserById(decodedToken.userId);
    if (!user) throw new Error('Token is not valid');

    req.userId = decodedToken.userId;
    req.user = user;

    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default verifyUser;
