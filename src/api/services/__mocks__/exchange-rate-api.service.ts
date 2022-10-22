export const mockGetExchangeRates = jest.fn().mockImplementation(() => {
  return {
    BRL: 5.095673,
    USD: 0.98298
  };
});

const mock = jest.fn().mockImplementation(() => {
  return { getExchangeRates: mockGetExchangeRates };
});

export default mock;
