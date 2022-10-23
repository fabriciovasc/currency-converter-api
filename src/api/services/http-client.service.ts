import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpException, { ErrorCode } from '@models/http-exception.model';

abstract class HttpClientService {
  protected readonly http: AxiosInstance;

  protected constructor(baseURL: string) {
    this.http = axios.create({ baseURL, timeout: 5000 });

    this.initializeResponseInterceptor();
  }

  initializeResponseInterceptor = () => {
    this.http.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = ({ data }: AxiosResponse) => Promise.resolve(data);

  protected handleError = (error: any): Promise<HttpException> => Promise.reject(error.message);
}

export default HttpClientService;
