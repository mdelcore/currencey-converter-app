const fromCurrencyInput = document.querySelector('.from-currency');
const toCurrencyInput = document.querySelector('.to-currency');
const exchangeAmountInput = document.querySelector('.amount');
const getRateBtn = document.querySelector('.get-rate');

getRateBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const fromCurrencyValue = fromCurrencyInput.value;
  const toCurrencyValue = toCurrencyInput.value;
  const ExchangeAmountValue = exchangeAmountInput.value;

  if (fromCurrencyValue === '' || toCurrencyValue === '' || ExchangeAmountValue === '') {
    inputError();
  } else {
      convertCurrency(fromCurrencyValue, toCurrencyValue, ExchangeAmountValue).then(exchangeResult => {
      document.querySelector('.currency-item').innerText = exchangeResult;

      setTimeout(() => {
        location.reload()
      }, 6000);
    })
    .catch(() => invalidCode());
  }
});

// Function for getting the exchange rate
async function getExchangeRate(fromCurrency, toCurrency) {
  const response = await fetch('http://data.fixer.io/api/latest?access_key=0811bd3397f10617d97b1429984d704b');

  const currencyData = await response.json();
  const currencyRates = currencyData.rates;
  const baseCurrency = 1 / currencyRates[fromCurrency];
  const exchangeRate = baseCurrency * currencyRates[toCurrency];

  if (isNaN(exchangeRate)) {
    throw new Error(invalidCode());
  }

  return exchangeRate;
}

// ============================================================================

// Function for converting currency
async function convertCurrency(fromCurrency, toCurrency, exchangeAmount) {
  const amountExchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const convertedAmount = (exchangeAmount * amountExchangeRate).toFixed(2);

  return `${exchangeAmount} ${fromCurrency} ====> ${convertedAmount} ${toCurrency}`;
}

// ============================================================================

// Error Functions
function inputError() {
  document.querySelector('.input-error').classList.add('show');
  setTimeout(() => {
    document.querySelector('.input-error').classList.add('remove');
  }, 2500);
}

function invalidCode() {
  document.querySelector('.invalid-code').classList.add('show');
  setTimeout(() => {
    document.querySelector('.invalid-code').classList.add('remove');
  }, 1500);
}