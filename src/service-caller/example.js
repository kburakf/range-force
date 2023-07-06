const { example: serviceUrl } = require('../constants/services');

module.exports = class ExampleServiceCaller {
  constructor({ ServiceCaller }) {
    this.ServiceCaller = ServiceCaller;
  }

  async getExampleData() {
    const { ServiceCaller } = this;
    return ServiceCaller.request({ serviceUrl, method: 'GET', path: '/example' });
  }
};
