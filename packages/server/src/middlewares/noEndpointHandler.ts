import { RequestHandler } from 'express';

const noEndpointHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: `Endpoint ${req.url} not existing` });
};

export default noEndpointHandler;
