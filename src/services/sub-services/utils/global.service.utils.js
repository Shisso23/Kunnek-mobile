const constructAxiosCancelToken = ({ requestSource }) => ({
  cancelToken: requestSource.token,
});

export default {
  constructAxiosCancelToken,
};
