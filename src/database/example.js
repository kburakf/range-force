module.exports = class ExampleDatabase {
  constructor({ ExampleModel }) {
    this.ExampleModel = ExampleModel;
  }

  async getExampleById({ exampleId }) {
    const { ExampleModel } = this;
    return ExampleModel.findById({ _id: exampleId })
      .lean()
      .exec();
  }

  async createExample({ example }) {
    const { ExampleModel } = this;
    return (await ExampleModel.create(example)).toObject();
  }

  async updateExample({ exampleId, data }) {
    const { ExampleModel } = this;
    return ExampleModel.findByIdAndUpdate(
      { _id: exampleId },
      data,
      { new: true },
    )
      .lean()
      .exec();
  }

  async deleteExample({ exampleId }) {
    const { ExampleModel } = this;
    return ExampleModel.findByIdAndDelete({ _id: exampleId })
      .lean()
      .exec();
  }
};
