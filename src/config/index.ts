const appConfig = {
  app: {
    name: process.env.APP_NAME,
    server: process.env.NODE_ENV,
    isDevelopment: process.env.NODE_ENV === 'development',
    apiVersion: process.env.API_VERSION,
    port: parseInt(<string>process.env.PORT, 10)
  },
  database: {
    url: process.env.DATABASE_URL
  },
  exchangeRateApi: {
    ACCESS_KEY: process.env.EXCHANGE_RATE_ACCESS_KEY
  }
};

export default Object.freeze(appConfig);
