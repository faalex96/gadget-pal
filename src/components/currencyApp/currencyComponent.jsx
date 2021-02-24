import React from "react";
import "./currencyApp.css";

// Function for exchanging to second currency
function toSecondCurr(curr1, exchangeRate) {
  return curr1 / exchangeRate;
}

// Function for exchanging to base currency
function toBaseCurr(curr2, exchangeRate) {
  return curr2 * exchangeRate;
}

// Function that tries to do conversion and does the rounding of a number
// convert is a callback
function tryConvert(currency, convert, exchangeRate) {
  const input = parseFloat(currency);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input, exchangeRate);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// CurrencyInput is a child component of calculator component
// It handles changes trough methods from parent component calculator
class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e) {
    this.props.onCurrencyChange(e.target.value);
  }

  handleSelect(e) {
    this.props.handleSelectChange(e.target.value);
  }

  render() {
    const amount = this.props.amount;
    const curr = this.props.curr;
    return (
      <div className="currency-input">
        <input type="text" value={amount} onChange={this.handleChange} />
        <select onChange={this.handleSelect} value={curr}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="RSD">RSD</option>
          <option value="JPY">JPY</option>
          <option value="CHF">CHF</option>
          <option value="GBP">GBP</option>
          <option value="HRK">HRK</option>
          <option value="HRK">HRK</option>
          <option value="HUF">HUF</option>
        </select>
      </div>
    );
  }
}

// Calculator is the parent component which handles all the state changes
// Does the data fetching and handles calculations for currency conversion
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurr1Change = this.handleCurr1Change.bind(this);
    this.handleCurr2Change = this.handleCurr2Change.bind(this);
    this.handleSelectOne = this.handleSelectOne.bind(this);
    this.handleSelectTwo = this.handleSelectTwo.bind(this);
    this.state = {
      amount: "",
      scale: "base",
      exchangeRate: "",
      curr1: "EUR",
      curr2: "EUR",
      err: "",
    };
  }

  getCurrData = async () => {
    try {
      const curr1 = this.state.curr1;
      const curr2 = this.state.curr2;
      const response = await fetch(
        `https://free.currconv.com/api/v7/convert?q=${curr1}_${curr2}&compact=ultra&apiKey=d41b8ae73694fcf0acfd`
      );
      const result = await response.json();
      this.setState({ exchangeRate: result[`${curr1}_${curr2}`] });
    } catch (err) {
      this.setState({
        err: "There was a problem with data for exchange rate.",
      });
    }
  };

  componentDidMount() {
    this.getCurrData();
  }

  handleCurr1Change(amount) {
    this.setState({ scale: "base", amount: amount });
  }

  handleCurr2Change(amount) {
    this.setState({ scale: "second", amount: amount });
  }

  handleSelectOne(currency) {
    this.setState({ curr1: currency }, this.getCurrData);
  }

  handleSelectTwo(currency) {
    this.setState({ curr2: currency }, this.getCurrData);
  }

  render() {
    const scale = this.state.scale;
    const amount = this.state.amount;
    const exchangeRate = this.state.exchangeRate;
    const curr1 =
      scale === "second"
        ? tryConvert(amount, toSecondCurr, exchangeRate)
        : amount;
    const curr2 =
      scale === "base" ? tryConvert(amount, toBaseCurr, exchangeRate) : amount;

    let element;
    if (this.state.err) {
      element = (
        <div className="currency-calculator">
          <p>{this.state.err}</p>
        </div>
      );
    } else {
      element = (
        <div className="currency-calculator">
          <CurrencyInput
            amount={curr1}
            onCurrencyChange={this.handleCurr1Change}
            handleSelectChange={this.handleSelectOne}
            curr={this.state.curr1}
          />
          <CurrencyInput
            amount={curr2}
            onCurrencyChange={this.handleCurr2Change}
            handleSelectChange={this.handleSelectTwo}
            curr={this.state.curr2}
          />
        </div>
      );
    }

    return element;
  }
}

export default Calculator;
