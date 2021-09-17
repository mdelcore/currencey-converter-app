// Function for getting the exchange rate
async function getExchangeRate(fromCurrency, toCurrency) {
  const response = await fetch('http://data.fixer.io/api/latest?access_key=0811bd3397f10617d97b1429984d704b');

  const currencyData = await response.json();
  const currencyRates = currencyData.rates;
  const baseCurrency = 1 / currencyRates[fromCurrency];
  const exchangeRate = baseCurrency * currencyRates[toCurrency];

  if (isNaN(exchangeRate)) {
    console.log('Error');
  }

  return exchangeRate;
}

// getExchangeRate("AFN", "USD").then(result => console.log(result));

// ============================================================================
// Function for converting currency
async function convertCurrency(fromCurrency, toCurrency, exchangeAmount) {
  const amountExchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const convertedAmount = (exchangeAmount * amountExchangeRate).toFixed(2);

  return `${exchangeAmount} ${fromCurrency} ====> ${convertedAmount} ${toCurrency}`;
}

convertCurrency("AFN", "USD", 1000).then(exchangeResult => console.log(exchangeResult));