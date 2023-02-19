import { ErrorRequestHandler } from 'express';

const errorsLogger: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ error: true, message: err.message });
  next(err);
};

export default errorsLogger;
