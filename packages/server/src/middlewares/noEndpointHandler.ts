import { RequestHandler } from 'express';
import createResponse from '../utils/createResponse';

const noEndpointHandler: RequestHandler = (req, res) => {
  res
    .status(404)
    .json(
      createResponse({
        error: true,
        message: `Endpoint ${req.url} not existing`,
      })
    );
};

export default noEndpointHandler;
