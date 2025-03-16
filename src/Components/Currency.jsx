import React, { useState, useEffect } from "react";

const currencyToCountry = {
  USD: "United States",
  EUR: "Eurozone",
  INR: "India",
  GBP: "United Kingdom",
  AUD: "Australia",
  CAD: "Canada",
  SGD: "Singapore",
  JPY: "Japan",
  CNY: "China",
  CHF: "Switzerland",
};

const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false); 

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setCurrencies(Object.keys(data.rates)))
      .catch((error) => console.error("Error fetching currencies", error));
  }, []);

  const handleConvert = () => {
    setLoading(true);
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setConversionRate(data.rates[toCurrency]);
        setShowResult(true); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching conversion rate", error);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#FFD580",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "40px", color: "purple", fontFamily: "Arial, sans-serif" }}>
        Currency Converter
      </h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        style={{ margin: "10px 0", padding: "5px", width: "98%", fontSize: "20px" }}
      />
      <div style={{ display: "flex", justifyContent: "center", width: "100%", gap: "2rem" }}>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{ margin: "10px 0", padding: "10px", width: "48%", fontSize: "16px" }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currencyToCountry[currency] || currency} ({currency})
            </option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{ margin: "10px 0", padding: "10px", width: "48%", fontSize: "16px" }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currencyToCountry[currency] || currency} ({currency})
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleConvert}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "10px",
          width: "100%",
          fontSize: "16px",
        }}
      >
        {loading ? "Converting..." : "Convert"}
      </button>
      {showResult && conversionRate !== null && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "30px",
            fontWeight: "bold",
            color: "green",
            textShadow: "2px 2px 2px #ccc",
          }}
        >
          {amount} {currencyToCountry[fromCurrency] || fromCurrency} ({fromCurrency}) ={" "}
          {(amount * conversionRate)} {currencyToCountry[toCurrency] || toCurrency} ({toCurrency})
        </p>
      )}
    </div>
  );
};

export default Currency;
