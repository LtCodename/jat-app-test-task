import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./MainPage.css";
import RateReducer from "../../redux/RateReducer";

const MainPage = () => {
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [value, setValue] = useState(1);
  const [allCurrencies, setAllCurrencies] = useState([]);

  const dispatch = useDispatch();
  const rate = useSelector((state) => state.rate);

  useEffect(() => {
    getAllCurrencies();
  }, []);

  useEffect(() => {
    convert();
    // eslint-disable-next-line
  }, [convertTo, convertFrom, value]);

  const getAllCurrencies = () => {
    axios
      .get("https://api.openrates.io/latest")
      .then((response) => {
        let allCurrencyValues = ["EUR"];
        for (let key in response.data.rates) {
          allCurrencyValues.push(key);
        }

        setAllCurrencies(allCurrencyValues.sort());
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const selectValue = (event) => {
    if (event.target.name === "from") {
      setConvertFrom(event.target.value);
    } else {
      setConvertTo(event.target.value);
    }
  };

  const convert = () => {
    dispatch({ type: RateReducer.actions.RATE_SET, rate: "..." });

    axios
      .get(
        `https://api.openrates.io/latest?base=${convertFrom}&symbols=${convertTo}`
      )
      .then((response) => {
        const result = value * response.data.rates[convertTo];
        dispatch({
          type: RateReducer.actions.RATE_SET,
          rate: result.toFixed(2),
        });
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return (
    <div className="column column-h column-v converter-wrapper">
      <div className="column converter-content">
        <span className="app-title">
          Jat <span className="app-title-detail">App</span> Currency Converter
        </span>
        {/* Amount */}
        <div className="row row-h convertor-row">
          <span className="convertor-text">Amount</span>
          <input
            className="convertor-input"
            name="value"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          ></input>
        </div>
        {/* From */}
        <div className="row row-h convertor-row">
          <span className="convertor-text">From</span>
          <select
            className="convertor-input"
            name="from"
            onChange={(event) => selectValue(event)}
            value={convertFrom}
          >
            {allCurrencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        {/* To */}
        <div className="row row-h convertor-row">
          <span className="convertor-text">To</span>
          <select
            className="convertor-input"
            name="to"
            onChange={(event) => selectValue(event)}
            value={convertTo}
          >
            {allCurrencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        {/* Result */}
        <div className="row row-h">
          <span className="converter-result">{rate}</span>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
