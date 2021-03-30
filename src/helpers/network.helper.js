import _ from 'lodash';

export const getParamString = (params) => {
  const keys = Object.keys(params);
  let index = 0;
  return _.reduce(
    keys,
    (final, key) => {
      const prefix = index === 0 ? '?' : '';
      const suffix = index < keys.length - 1 ? '&' : '';
      const value = _.get(params, key);

      if (!_.isNil(value)) {
        index += 1;
        final += `${prefix}${key}=${encodeURIComponent(value)}${suffix}`;
      }

      return final;
    },
    '',
  );
};
