const tags = ['module'];
const { tokenSchema } = require('.');

const { DIFFICULTIES } = require('../constants');

module.exports = {
  create: {
    tags,
    summary: 'Create module',
    headers: tokenSchema,
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
          maxLength: 50,
          minLength: 1,
          description: 'Maximum character limit is 50',
        },
        description: {
          type: 'string',
          minLength: 1,
          maxLength: 150,
          description: 'Maximum character limit is 150',
        },
        difficulty: { type: 'string', enum: Object.values(DIFFICULTIES) },
      },
      required: ['name', 'description', 'difficulty'],
    },
  },
  update: {
    tags,
    summary: 'Update module',
    headers: tokenSchema,
    params: { moduleId: { type: 'string' } },
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 30 },
        description: { type: 'string', minLength: 1, maxLength: 30 },
        difficulty: { type: 'string', enum: Object.values(DIFFICULTIES) },
      },
    },
  },
  delete: {
    tags,
    summary: 'Delete module',
    headers: tokenSchema,
    params: { moduleId: { type: 'string' } },
  },
  startTraining: {
    tags,
    summary: 'Start training module',
    headers: tokenSchema,
    params: { moduleId: { type: 'string' } },
  },
  top10Modules: {
    tags,
    summary: 'Get top 10 modules of current month',
    headers: tokenSchema,
  },
};
