const tags = ['examples'];

module.exports = {
  getExampleSchema: {
    tags,
    summary: 'Get example model.',
    params: {
      id: { type: 'string' },
    },
  },
  createExampleSchema: {
    tags,
    summary: 'Create example model.',
    body: {
      type: 'object',
      properties: {
        example: {
          type: 'object',
          properties: {
            text: { type: 'string' },
          },
        },
      },
    },
  },
  updateExampleSchema: {
    tags,
    summary: 'Update example model.',
    params: {
      id: { type: 'string' },
    },
    body: {
      type: 'object',
      properties: {
        example: {
          type: 'object',
          properties: {
            text: { type: 'string' },
          },
        },
      },
    },
  },
  getExamplesSchema: {
    tags,
    summary: 'Get all examples.',
  },
  deleteExampleSchema: {
    tags,
    summary: 'Delete example model.',
    params: {
      id: { type: 'string' },
    },
  },
};
