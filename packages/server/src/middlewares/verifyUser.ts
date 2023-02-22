import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyUser: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Not Autorized' });

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayload;
    // TODO: Check token expiration

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default verifyUser;
