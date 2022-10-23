import currency from 'currency.js';

const currencyOptions: currency.Options = {
  precision: 3
};

const handleCurrency = (value: number) => currency(value, currencyOptions);

export default handleCurrency;
