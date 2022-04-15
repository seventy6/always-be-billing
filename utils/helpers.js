var numeral = require("numeral");

export const formatToCurrency = (val) => numeral(val).format("$0,0"); //`$` + val;
export const formatToPercent = (val) => numeral(val).format("0%"); //`$` + val;
export const parseCurrencyToNumber = (val) => val.replace(/^\$/, "");
export const parsePercentToNumber = (val) => val.replace(/^\%/, "");
