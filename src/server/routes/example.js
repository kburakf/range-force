const ExampleSchema = require('../../schemas/example');

const routes = [
  {
    method: 'GET',
    url: '/api/example/:id',
    schema: ExampleSchema.getExampleSchema,
    handler: 'ExampleController.getExampleById',
  },
  {
    method: 'POST',
    url: '/api/example',
    schema: ExampleSchema.createExampleSchema,
    handler: 'ExampleController.createExample',
  },
  {
    method: 'PUT',
    url: '/api/example/:id',
    schema: ExampleSchema.updateExampleSchema,
    handler: 'ExampleController.updateExample',
  },
  {
    method: 'DELETE',
    url: '/api/example/:id',
    schema: ExampleSchema.deleteExampleSchema,
    handler: 'ExampleController.deleteExample',
  },
];

module.exports = routes;
