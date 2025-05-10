var numeral = require("numeral");

export const formatToCurrency = (val, symbol, abbreviated = false) => {
  if (abbreviated) {
    // For chart axis, use abbreviated format (K for thousands, M for millions)
    return numeral(val).format("0a") + " " + symbol;
  }
  return numeral(val).format("0,0") + " " + symbol;
}; //`$` + val;
export const formatToPercent = (val) => numeral(val).format("0%"); //`$` + val;
export const formatToDecimal = (val, precision = 2) => {
  const format = `0,0.${"0".repeat(precision)}`;
  return numeral(val).format(format);
};
export const parseCurrencyToNumber = (val) => {
  // Check if the string contains a minus sign
  const isNegative = val.includes('-');
  // Remove all non-numeric characters except dots and commas
  const cleanedValue = val.replace(/[^\d.,]/g, "");
  // Add the minus sign back if the original value was negative
  return isNegative ? '-' + cleanedValue : cleanedValue;
};

export const parsePercentToNumber = (val) => {
  // Check if the string contains a minus sign
  const isNegative = val.includes('-');
  // Remove all non-numeric characters except dots and commas
  const cleanedValue = val.replace(/[^\d.,]/g, "");
  // Add the minus sign back if the original value was negative
  return isNegative ? '-' + cleanedValue : cleanedValue;
};
