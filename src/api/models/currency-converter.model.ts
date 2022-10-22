import currency from 'currency.js';

const currencyOptions: currency.Options = {
  precision: 3
};

class CurrencyConverter {
  public readonly baseValue: number;
  public readonly baseCurrencyValue: number;
  public readonly quoteCurrencyValue: number;

  public readonly conversionRate: number;
  public readonly quoteValue: number;

  constructor(baseValue: number, baseCurrencyValue: number, quoteCurrencyValue: number) {
    this.baseValue = baseValue;
    this.baseCurrencyValue = baseCurrencyValue;
    this.quoteCurrencyValue = quoteCurrencyValue;
    this.conversionRate = this.getConversionRate();
    this.quoteValue = this.convertBaseValueToQuoteValue();
  }

  private convertBaseValueToQuoteValue() {
    if (this.baseCurrencyValue > this.quoteCurrencyValue) {
      return currency(this.baseValue, currencyOptions).divide(this.conversionRate).value;
    }

    return currency(this.conversionRate, currencyOptions).multiply(this.baseValue).value;
  }

  private getConversionRate(): number {
    if (this.baseCurrencyValue < this.quoteCurrencyValue) {
      return currency(this.quoteCurrencyValue, currencyOptions).divide(this.baseCurrencyValue).value;
    }

    return currency(this.baseCurrencyValue, currencyOptions).divide(this.quoteCurrencyValue).value;
  }
}

export default CurrencyConverter;
