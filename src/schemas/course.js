const tags = ['course'];
const { tokenSchema } = require('.');

module.exports = {
  create: {
    tags,
    summary: 'Create course',
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
      },
      required: ['name'],
    },
  },
  update: {
    tags,
    summary: 'Update course',
    headers: tokenSchema,
    params: { courseId: { type: 'string' } },
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 30 },
      },
    },
  },
  delete: {
    tags,
    summary: 'Delete course',
    headers: tokenSchema,
    params: { courseId: { type: 'string' } },
  },
  addModuleToCourse: {
    tags,
    summary: 'Add module to course',
    headers: tokenSchema,
    params: { courseId: { type: 'string' }, moduleId: { type: 'string' } },
  },
  listModulesByCourseName: {
    tags,
    summary: 'List modules by category name',
    headers: tokenSchema,
    query: { name: { type: 'string' } },
  },
};
