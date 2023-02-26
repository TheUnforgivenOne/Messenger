import { IResponseParams } from 'monorepo-shared';

type CreateResponseParams = Partial<IResponseParams>;
type CreateResponseFn = (params: CreateResponseParams) => IResponseParams;

const createResponse: CreateResponseFn = ({
  error = false,
  message = '',
  data = {},
}) => ({
  error,
  message,
  data,
});

export default createResponse;
