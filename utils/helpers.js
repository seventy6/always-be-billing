var numeral = require("numeral");

export const formatToCurrency = (val, symbol) => {
  return numeral(val).format("0,0") + " " + symbol;
}; //`$` + val;
export const formatToPercent = (val) => numeral(val).format("0%"); //`$` + val;
export const parseCurrencyToNumber = (val) => val.replace(/^\symbol/, "");
export const parsePercentToNumber = (val) => val.replace(/^\symbol/, "");
