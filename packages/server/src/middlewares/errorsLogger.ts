import { ErrorRequestHandler } from 'express';
import createResponse from '../utils/createResponse';

const errorsLogger: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json(createResponse({ error: true, message: err.message }));
  next(err);
};

export default errorsLogger;
