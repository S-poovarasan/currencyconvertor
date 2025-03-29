import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    fetch(`${API_URL}${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((err) => console.error("Failed to fetch", err));
  }, [fromCurrency]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const availableCurrencies = useMemo(() => Object.keys(exchangeRates), [exchangeRates]);

  const convert = useCallback(() => {
    if (exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, toCurrency, exchangeRates]);

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <div>
        <input ref={inputRef} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button onClick={convert}>Convert</button>
        {convertedAmount && (<h2>{amount}{fromCurrency}={convertedAmount} {toCurrency}</h2> )}
      </div>
    </div>
  );
}

export default App;
