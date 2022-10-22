import CurrencyConverter from '@models/currency-converter.model';

const brlToUsd = {
  baseCurrency: 'BRL',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 5.091368,
  quoteCurrencyValue: 0.986144,
  quoteValue: 1.937,
  conversionRate: 5.163
};

const ugxToUzs = {
  baseCurrency: 'UGX',
  quoteCurrency: 'UZS',
  baseValue: 10,
  baseCurrencyValue: 3761.324226,
  quoteCurrencyValue: 10990.578114,
  quoteValue: 29.22,
  conversionRate: 2.922
};

const jpyToUsd = {
  baseCurrency: 'JPY',
  quoteCurrency: 'USD',
  baseValue: 10,
  baseCurrencyValue: 145.628893,
  quoteCurrencyValue: 0.986144,
  quoteValue: 0.068,
  conversionRate: 147.675
};

const testCases = [brlToUsd, ugxToUzs, jpyToUsd];

const testCaseName = 'should return quoteValue $quoteValue from $baseCurrency to $quoteCurrency';

describe('currency converter model', () => {
  test.each(testCases)(
    testCaseName,
    ({ baseValue, baseCurrencyValue, quoteCurrencyValue, conversionRate, quoteValue }) => {
      const currencyConverter = new CurrencyConverter(baseValue, baseCurrencyValue, quoteCurrencyValue);
      expect(currencyConverter.conversionRate).toEqual(conversionRate);
      expect(currencyConverter.quoteValue).toEqual(quoteValue);
    }
  );
});
