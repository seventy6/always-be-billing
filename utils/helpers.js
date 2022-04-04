export const formatToCurrency = (val) => `$` + val;
export const parseCurrencyToNumber = (val) => val.replace(/^\$/, '')
