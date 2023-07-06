module.exports = class ExampleController {
  constructor({ ExampleService }) {
    this.ExampleService = ExampleService;
  }

  async getExampleById(request) {
    const { ExampleService } = this;
    const exampleId = request.params.id;
    return ExampleService.getExampleById({ exampleId });
  }

  async createExample(request) {
    const { ExampleService } = this;
    const { example } = request.body;
    return ExampleService.createExample({ example });
  }

  async updateExample(request) {
    const { ExampleService } = this;
    const exampleId = request.params.id;
    const data = request.body.example;
    return ExampleService.updateExample({ exampleId, data });
  }

  async deleteExample(request) {
    const { ExampleService } = this;
    const exampleId = request.params.id;
    return ExampleService.deleteExample({ exampleId });
  }
};
