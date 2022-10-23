import { AxiosRequestConfig } from 'axios';

import HttpClientService from './http-client.service';
import config from '../../config';

const EXCHANGE_RATE_BASE_URL = 'https://api.apilayer.com/exchangerates_data';

class ExchangeRateApiService extends HttpClientService {
  private readonly ACCESS_KEY = config.exchangeRateApi.ACCESS_KEY;

  constructor() {
    super(EXCHANGE_RATE_BASE_URL);

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.http.interceptors.request.use(this.handleRequest, this.handleError);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    const apikey = this.ACCESS_KEY;
    config.headers = {
      ...config.headers,
      apikey
    };

    return config;
  };

  public getExchangeRates = (symbols: string[] = []): Promise<{ [key: string]: number }> => {
    const base = 'EUR'; // Currency base available on free plan
    return this.http
      .get('/latest', { params: { base, symbols: symbols.join(',') } })
      .then(<any>this.getRatesFromResponse);
  };

  private getRatesFromResponse = (response: {
    success: boolean;
    rates: { [key: string]: number };
    error?: { type: string; message: string };
  }): { [key: string]: number } => {
    if (!response.success) {
      const { type = 'unknown_error', message = 'External API error' } = response.error || {};
      const errorMessage = `${type}: ${message}`;
      throw new Error(errorMessage);
    }
    return response?.rates;
  };
}

export default ExchangeRateApiService;
