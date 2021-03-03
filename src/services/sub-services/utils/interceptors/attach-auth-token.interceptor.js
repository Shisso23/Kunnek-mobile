const createAttachTokenInterceptor = (axiosInstance, getAccessToken) => {
  const _attachAccessToken = (config) =>
    getAccessToken().then((accessToken) => {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

  return axiosInstance.interceptors.request.use(_attachAccessToken);
};
export default createAttachTokenInterceptor;
