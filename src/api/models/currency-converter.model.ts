import handleCurrency from '@utils/currency';

class CurrencyConverter {
  public readonly baseValue: number;
  public readonly baseCurrencyValue: number;
  public readonly quoteCurrencyValue: number;

  public readonly conversionRate: number;
  public readonly quoteRate: number;

  constructor(baseValue: number, baseCurrencyValue: number, quoteCurrencyValue: number) {
    this.baseValue = baseValue;
    this.baseCurrencyValue = baseCurrencyValue;
    this.quoteCurrencyValue = quoteCurrencyValue;
    this.conversionRate = this.getConversionRate();
    this.quoteRate = this.getQuoteRate();
  }

  public static getQuoteValue(baseValue: number, quoteRate: number): number {
    return handleCurrency(baseValue).multiply(quoteRate).value;
  }

  public static findQuoteRate(conversionRate: number, baseValue: number): number {
    return handleCurrency(conversionRate).divide(baseValue).value;
  }

  public getQuoteRate(): number {
    let value;
    if (this.quoteCurrencyValue < this.baseCurrencyValue) {
      value = handleCurrency(this.baseValue).divide(this.conversionRate).value;
    } else {
      value = handleCurrency(this.conversionRate).multiply(this.baseValue).value;
    }

    return handleCurrency(value).divide(this.baseValue).value;
  }

  private getConversionRate(): number {
    if (this.quoteCurrencyValue > this.baseCurrencyValue) {
      return handleCurrency(this.quoteCurrencyValue / this.baseCurrencyValue).value;
    }

    return handleCurrency(this.baseCurrencyValue / this.quoteCurrencyValue).value;
  }
}

export default CurrencyConverter;
