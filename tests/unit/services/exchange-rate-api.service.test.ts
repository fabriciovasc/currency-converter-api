import axios from 'axios';
import ExchangeRateApiService from '@services/exchange-rate-api.service';
import mocked = jest.mocked;

jest.mock('axios');
jest.mock('@services/exchange-rate-api.service');

const axiosMock = mocked(axios);
const exchangeRateApiMock = mocked(new ExchangeRateApiService());

beforeEach(() => {
  axiosMock.mockReset();
  exchangeRateApiMock.getExchangeRates.mockReset();
});

describe('exchange rate api service', () => {
  test('should throw an error because not success response', async () => {
    // Given
    const mockedResponseError: any = {
      success: false,
      error: {
        type: 'currency_not_found'
      }
    };

    // When
    axiosMock.get.mockResolvedValue(mockedResponseError);
    exchangeRateApiMock.getExchangeRates.mockRejectedValue(new Error(mockedResponseError.error.type));

    // Then
    const exchangeRateApi = new ExchangeRateApiService();
    await expect(exchangeRateApi.getExchangeRates()).rejects.toThrowError(mockedResponseError.error.type);
  });

  test('should return exchange rates', async () => {
    // Given
    const mockedResponse: any = {
      success: true,
      rates: {
        USD: 1.05,
        BRL: 5.45,
        EUR: 9.44
      }
    };

    // When
    axiosMock.get.mockResolvedValue(mockedResponse);
    exchangeRateApiMock.getExchangeRates.mockResolvedValue(mockedResponse.rates);

    // Then
    const exchangeRateApi = new ExchangeRateApiService();
    await expect(exchangeRateApi.getExchangeRates()).resolves.toEqual(mockedResponse.rates);
  });
});
