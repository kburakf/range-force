const { serviceUrls } = require('../config/environments/default');

module.exports = class ServiceCaller {
  constructor({ axios }) {
    this.urls = serviceUrls;
    this.axios = axios;
  }

  async request({
    serviceUrl, method, path = {}, data = {}, params = {}, headers = {},
  }) {
    const { urls } = this;
    const url = `${urls[serviceUrl]}${path}`;
    const request = {
      method,
      url,
      data,
      params,
      headers,
    };

    return axios(request).catch((error) => {
      throw Error(error);
    });
  }
};
