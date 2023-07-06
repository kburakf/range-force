const tokenSchema = {
  type: 'object',
  properties: { token: { type: 'string' } },
  required: ['token'],
};

module.exports = {
  tokenSchema,
};
