import currency from 'currency.js';

const currencyOptions: currency.Options = {
  precision: 3
};

const handleCurrency = (value: number) => currency(value, currencyOptions);

class CurrencyConverter {
  public readonly baseValue: number;
  public readonly baseCurrencyValue: number;
  public readonly quoteCurrencyValue: number;

  public readonly conversionRate: number;
  public readonly quoteRate: number;
  public readonly quoteValue: number;

  constructor(baseValue: number, baseCurrencyValue: number, quoteCurrencyValue: number) {
    this.baseValue = baseValue;
    this.baseCurrencyValue = baseCurrencyValue;
    this.quoteCurrencyValue = quoteCurrencyValue;
    this.conversionRate = this.getConversionRate();
    this.quoteValue = this.convertBaseValueToQuoteValue();
    this.quoteRate = this.getQuoteRate();
  }

  static getQuote(baseValue: number, quoteRate: number): number {
    return handleCurrency(baseValue).multiply(quoteRate).value;
  }

  private getQuoteRate(): number {
    return handleCurrency(this.conversionRate).divide(this.baseValue).value;
  }

  private convertBaseValueToQuoteValue(): number {
    if (this.baseCurrencyValue > this.quoteCurrencyValue) {
      return handleCurrency(this.baseValue).divide(this.conversionRate).value;
    }

    return handleCurrency(this.conversionRate).multiply(this.baseValue).value;
  }

  private getConversionRate(): number {
    if (this.quoteCurrencyValue > this.baseCurrencyValue) {
      return handleCurrency(this.quoteCurrencyValue).divide(this.baseCurrencyValue).value;
    }

    return handleCurrency(this.baseCurrencyValue).divide(this.quoteCurrencyValue).value;
  }
}

export default CurrencyConverter;
