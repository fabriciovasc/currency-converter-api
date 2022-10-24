import handleCurrency from '@utils/currency';

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
    this.quoteRate = CurrencyConverter.findQuoteRate(this.conversionRate, this.baseValue);
    this.quoteValue = CurrencyConverter.getQuote(baseValue, this.quoteRate);
  }

  public static getQuote(baseValue: number, quoteRate: number): number {
    return handleCurrency(baseValue).multiply(quoteRate).value;
  }

  public static findQuoteRate(conversionRate: number, baseValue: number): number {
    return handleCurrency(conversionRate).divide(baseValue).value;
  }

  private getConversionRate(): number {
    let diffCurrencyValue;
    let conversion;
    if (this.quoteCurrencyValue > this.baseCurrencyValue) {
      diffCurrencyValue = this.quoteCurrencyValue / this.baseCurrencyValue;
      conversion = diffCurrencyValue * this.baseValue;
      return handleCurrency(conversion).value;
    }

    diffCurrencyValue = this.baseCurrencyValue / this.quoteCurrencyValue;
    conversion = this.baseValue / diffCurrencyValue;
    return handleCurrency(conversion).value;
  }
}

export default CurrencyConverter;
