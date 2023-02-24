import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { IUser, ISignInParams } from './interfaces';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const userSchema: JSONSchemaType<IUser> = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 4 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password', minLength: 4 },
  },
  required: ['username', 'email', 'password'],
};
export const validateUser = ajv.compile(userSchema);

const signInSchema: JSONSchemaType<ISignInParams> = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string', format: 'password' },
  },
  required: ['username', 'password'],
};
export const validateSignInParams = ajv.compile(signInSchema);
