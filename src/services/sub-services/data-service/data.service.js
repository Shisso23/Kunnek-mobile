import _ from 'lodash';
import networkService from '../network-service/network.service';
import config from '../../../config';
import { objectToFormData } from '../../../helpers/data.helper';

const add = (url, dataToAdd, { type, extraData }) => {
  const data = {
    [type]: dataToAdd,
    ...extraData,
  };

  return networkService
    .doPost(url, data, {
      ...defaultRequestConfig,
      shouldThrowError: true,
    })
    .then((response) => _.get(response, 'data'));
};

const addOrGet = (url, dataToAdd, { type }) => {
  const data = {
    [type]: dataToAdd,
  };

  return networkService.post(url, data, {
      ...defaultRequestConfig,
      shouldThrowError: true,
    })
    .then((response) => _.get(response, 'data'));
};

const fetchAll = (url, params = {}) =>
  networkService
    .get(`${url}${getParamString(params)}`, {
      ...defaultRequestConfig,
      shouldThrowError: true,
    })
    .then((response) => _.get(response, 'data'));

const fetchAllWithPagination = (url, params = {}) =>
  networkService
    .get(`${url}${getParamString(params)}`, {
      ...defaultRequestConfig,
      shouldThrowError: true,
    })
    .then((response) => _.get(response, 'data'));

const get = (id, url) =>
  networkService
    .get(`${url}/${id}`, {
      ...defaultRequestConfig,
      shouldThrowError: true,
    })
    .then((response) => _.get(response, 'data'));

const update = (id, url, data) =>
  networkService
    .put(`${url}/${id}`, data, {
      ...defaultRequestConfig,
      shouldThrowError: true,
    })
    .then((response) => _.get(response, 'data'));

const remove = (id, url) =>
  networkService
    .delete(`${url}/${id}`, {
      ...defaultRequestConfig,
      shouldThrowError: true,
    })
    .then((response) => _.get(response, 'data'));

const getParamString = (params) => {
  const keys = Object.keys(params);
  let index = 0;
  return _.reduce(
    keys,
    (final, key) => {
      const prefix = index === 0 ? '?' : '';
      const suffix = index < keys.length - 1 ? '&' : '';
      const value = _.get(params, key);

      if (!_.isNil(value)) {
        index++;
        final += `${prefix}${key}=${encodeURIComponent(value)}${suffix}`;
      }

      return final;
    },
    '',
  );
};

const uploadFile = (url, { filePath, fileType, model, name }) => {
  const data = new FormData();
  data.append(`${model}[${name}]`, {
    uri: filePath,
    type: fileType,
    name,
  });

  return networkService.getRequestConfig(config).then((defaultConfig) => {
    const { requestConfig } = _.merge(defaultConfig, config);

    return fetch(url, {
      method: 'put',
      body: data,
      headers: requestConfig.headers,
    }).then((response) => _.get(response, 'data'));
  });
};

const addWithFiles = (dataToAdd, { type, url }) => {
  const data = objectToFormData(dataToAdd, undefined, type);

  return networkService
    .doPost(url, data, {
      ...defaultRequestConfig,
      shouldThrowError: true,
      requestConfig: {
        headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
      },
    })
    .then((response) => _.get(response, 'data'));
};

const updateWithFiles = (id, dataToAdd, { type, url }) => {
  const data = objectToFormData(dataToAdd, undefined, type);

  return networkService
    .doPut(`${url}/${id}`, data, {
      ...defaultRequestConfig,
      shouldThrowError: true,
      requestConfig: {
        headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
      },
    })
    .then((response) => _.get(response, 'data'));
};

export default {
  add,
  addWithFiles,
  addOrGet,
  update,
  updateWithFiles,
  fetchAll,
  fetchAllWithPagination,
  get,
  remove,
  uploadFile,
};
