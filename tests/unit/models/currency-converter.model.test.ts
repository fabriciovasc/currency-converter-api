import CurrencyConverter from '@models/currency-converter.model';

const brlToUsd = {
  baseCurrency: 'BRL',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 5.091368,
  quoteCurrencyValue: 0.986144,
  quoteValue: 1.937,
  conversionRate: 5.163,
  quoteRate: 0.516
};

const ugxToUzs = {
  baseCurrency: 'UGX',
  quoteCurrency: 'UZS',
  baseValue: 10,
  baseCurrencyValue: 3761.324226,
  quoteCurrencyValue: 10990.578114,
  quoteValue: 29.22,
  conversionRate: 2.922,
  quoteRate: 0.292
};

const jpyToUsd = {
  baseCurrency: 'JPY',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 145.628893,
  quoteCurrencyValue: 0.986144,
  quoteValue: 0.068,
  conversionRate: 147.675,
  quoteRate: 14.768
};

const usdToUsd = {
  baseCurrency: 'USD',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 0.986144,
  quoteCurrencyValue: 0.986144,
  quoteValue: 10,
  conversionRate: 1,
  quoteRate: 0.1
};

const testCases = [brlToUsd, ugxToUzs, jpyToUsd, usdToUsd];

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
