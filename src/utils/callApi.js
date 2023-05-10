const axios = require('axios');
const camelCaseKeys = require('camelcase-keys');
const uuid = require('uuid');

const { logger } = require('./logger');

const axiosInstance = axios.create({
  responseType: 'json',
  timeout: 10 * 1000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // eslint-disable-next-line no-param-reassign
    config.id = uuid.v4();
    const originalUrl = config.baseURL
      ? `${config.baseURL}${config.url}`
      : config.url;
    logger.info(
      '[callApi.req]',
      `[${config.source}]`,
      `[${config.id}]`,
      `${config.method.toUpperCase()} - ${originalUrl}`,
    );
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const blackList = [];
    const { config } = response;
    const originalUrl = config.baseURL
      ? `${config.baseURL}${config.url}`
      : config.url;
    const isShowData = !blackList.includes(
      `${response.config.method.toUpperCase()} - ${originalUrl}`,
    );
    logger.info(
      '[callApi.res.success]',
      `[${config.source}]`,
      `[${config.id}]`,
      isShowData ? JSON.stringify(response.data) : '',
    );
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return camelCaseKeys(response.data, {
      deep: true,
      stopPaths: ['result.attributeData', 'result.attribute_data'],
    });
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, response, message } = error;

    if (response && !response.error) {
      const { data } = response;
      const isShowData = !(
        data &&
        typeof data === 'string' &&
        data.match('<!DOCTYPE html>')
      );
      logger.error(
        '[callApi.res.error]',
        `[${config.source}]`,
        `[${config.id}]`,
        data && isShowData ? JSON.stringify(data) : '',
      );

      return camelCaseKeys(response.data, { deep: true });
    }
    logger.error(
      '[callApi.res.error]',
      `[${config && config.source}]`,
      `[${config && config.id}]`,
      message,
    );

    return Promise.reject(new Error(message || error));
  },
);

module.exports = axiosInstance;
