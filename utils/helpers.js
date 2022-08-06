var numeral = require("numeral");
const symbol = "$";

export const formatToCurrency = (val) => numeral(val).format(symbol + "0,0"); //`$` + val;
export const formatToPercent = (val) => numeral(val).format("0%"); //`$` + val;
export const parseCurrencyToNumber = (val) => val.replace(/^\symbol/, "");
export const parsePercentToNumber = (val) => val.replace(/^\symbol/, "");
