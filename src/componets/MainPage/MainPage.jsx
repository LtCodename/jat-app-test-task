import React, { useState, useEffect } from "react";
import axios from "axios";
import './MainPage.css';

const MainPage = () => {
    const [rate, setRate] = useState(null);
    const [convertFrom, setConvertFrom] = useState("USD");
    const [convertTo, setConvertTo] = useState("AUD");
    const [value, setValue] = useState(1);
    const [allCurrencies, setAllCurrencies] = useState([]);

    useEffect(() => {
        getAllCurrencies();
    },[]);

    useEffect(() => {
        convert();
    },[convertTo, convertFrom, value]);

    const getAllCurrencies = () => {
        axios.get("https://api.openrates.io/latest").then(response => {
            let allCurrencyValues = []
            for (let key in response.data.rates) {
                allCurrencyValues.push(key);
            }
            setAllCurrencies(allCurrencyValues.sort());
        }).catch(err => {
            console.log("error", err.message);
        });
    };

    const selectValue = (event) => {
        if (event.target.name === "from") {
            setConvertFrom(event.target.value)
        } else {
            setConvertTo(event.target.value);
        }
    }

    const convert = () => {
        axios.get(`https://api.openrates.io/latest?base=${convertFrom}&symbols=${convertTo}`).then(response => {
            const result = value * (response.data.rates[convertTo]);
            setRate(result.toFixed(2));
        }).catch(err => {
            console.log("error", err.message);
        });
    };

    return (
        <div className="column column-h column-v converter-wrapper">
            <div className="column converter-content">
                <span>Jat App Currency Converter</span> 
                {/* Amount */}
                <div className="row">
                    <span>Amount</span>
                    <input
                        name="value"
                        type="text"
                        value={value}
                        onChange={event => setValue(event.target.value)}>
                    </input>
                </div>
                {/* From */}
                <div className="row">
                    <span>From Currency</span>
                    <select
                        name="from"
                        onChange={(event) => selectValue(event)}
                        value={convertFrom}>
                        {allCurrencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                </div>
                {/* To */}
                <div className="row">
                    <span>To Currency</span>
                    <select
                        name="to"
                        onChange={(event) => selectValue(event)}
                        value={convertTo}>
                        {allCurrencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                </div>
                {/* Result */}
                <span>Result: {rate}</span>
            </div>
        </div>
    );
}

export default MainPage;
