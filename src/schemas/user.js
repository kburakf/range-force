const tags = ['user'];
const { tokenSchema } = require('.');

module.exports = {
  signup: {
    tags,
    summary: 'User signup',
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
          maxLength: 30,
          minLength: 1,
          description: 'Maximum character limit is 30',
        },
        surname: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
          description: 'Maximum character limit is 30',
        },
        email: { type: 'string', format: 'email' },
        password: {
          type: 'string',
          minLength: 8,
          format: 'password',
          description: 'Minimum password length is 8 character',
        },
      },
      required: ['name', 'surname', 'email', 'password'],
    },
  },
  login: {
    tags,
    summary: 'User login',
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
      },
      required: ['email', 'password'],
    },
  },
  update: {
    tags,
    summary: 'Update user detail',
    headers: tokenSchema,
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 30 },
        surname: { type: 'string', minLength: 1, maxLength: 30 },
        password: { type: 'string', minLength: 8, format: 'password' },
      },
    },
  },
};
