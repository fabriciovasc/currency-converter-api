const appConfig = {
  app: {
    server: process.env.NODE_ENV || 'dev',
    isDevelopment: process.env.NODE_ENV === 'dev',
    apiVersion: process.env.API_VERSION || 'v1',
    port: parseInt(<string>process.env.PORT, 10) || 8090
  },
  exchangeRateApi: {
    ACCESS_KEY: process.env.EXCHANGE_RATE_ACCESS_KEY || 'CCPa1bY1jjusV0uYEsCN9ZqLNqsSA0IZ'
  }
};

export default Object.freeze(appConfig);
