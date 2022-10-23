import CurrencyConverter from '@models/currency-converter.model';

const brlToUsd = {
  baseCurrency: 'BRL',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 5.100068,
  quoteCurrencyValue: 0.98801,
  conversionRate: 1.937,
  quoteRate: 0.194,
  quoteValue: 1.94
};

const ugxToUzs = {
  baseCurrency: 'UGX',
  quoteCurrency: 'UZS',
  baseValue: 10,
  baseCurrencyValue: 3730.016413,
  quoteCurrencyValue: 10888.406875,
  conversionRate: 29.191,
  quoteRate: 2.919,
  quoteValue: 29.19
};

const jpyToUsd = {
  baseCurrency: 'JPY',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 147.019533,
  quoteCurrencyValue: 0.98955,
  conversionRate: 0.067,
  quoteRate: 0.007,
  quoteValue: 0.07
};

const usdToUsd = {
  baseCurrency: 'USD',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 0.986144,
  quoteCurrencyValue: 0.986144,
  conversionRate: 10,
  quoteRate: 1,
  quoteValue: 10
};

const usdToBrl = {
  baseCurrency: 'USD',
  quoteCurrency: 'BRL',
  baseValue: 10,
  baseCurrencyValue: 0.986144,
  quoteCurrencyValue: 5.091368,
  conversionRate: 51.629,
  quoteRate: 5.163,
  quoteValue: 51.63
};

const testCases = [brlToUsd, ugxToUzs, jpyToUsd, usdToUsd, usdToBrl];

const testCaseName = 'should return quoteValue $quoteValue from $baseCurrency to $quoteCurrency';

describe('currency converter model', () => {
  test.each(testCases)(
    testCaseName,
    ({ baseValue, baseCurrencyValue, quoteCurrencyValue, conversionRate, quoteValue, quoteRate }) => {
      const currencyConverter = new CurrencyConverter(baseValue, baseCurrencyValue, quoteCurrencyValue);
      expect(currencyConverter.conversionRate).toEqual(conversionRate);
      expect(currencyConverter.quoteValue).toEqual(quoteValue);
      expect(currencyConverter.quoteRate).toEqual(quoteRate);
    }
  );
});
