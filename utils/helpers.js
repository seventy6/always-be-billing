var numeral = require('numeral');

export const formatToCurrency = (val) => numeral(val).format('$0,0.00');//`$` + val;
export const parseCurrencyToNumber = (val) => val.replace(/^\$/, '')
