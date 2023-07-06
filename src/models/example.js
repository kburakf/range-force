const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExampleSchema = new Schema({
  text: { type: String },
});

const ExampleModel = () => mongoose.model('Example', ExampleSchema);

module.exports = ExampleModel;
