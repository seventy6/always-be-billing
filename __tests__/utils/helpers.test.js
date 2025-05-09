import {
  formatToCurrency,
  formatToPercent,
  formatToDecimal,
  parseCurrencyToNumber,
  parsePercentToNumber
} from '../../utils/helpers';

describe('Currency formatting functions', () => {
  test('formatToCurrency formats number with currency symbol', () => {
    expect(formatToCurrency(1000, 'USD')).toBe('1,000 USD');
    expect(formatToCurrency(1234.56, 'EUR')).toBe('1,235 EUR');
    expect(formatToCurrency(0, '$')).toBe('0 $');
    expect(formatToCurrency(-500, '£')).toBe('-500 £');
  });

  test('parseCurrencyToNumber removes non-numeric characters except commas and dots, preserving negative sign', () => {
    expect(parseCurrencyToNumber('$1,000.00')).toBe('1,000.00');
    expect(parseCurrencyToNumber('1,234.56 EUR')).toBe('1,234.56');
    expect(parseCurrencyToNumber('£-500')).toBe('-500');  // Minus sign is preserved
    expect(parseCurrencyToNumber('-$1,000.00')).toBe('-1,000.00');
    expect(parseCurrencyToNumber('0 USD')).toBe('0');
  });
});

describe('Decimal formatting functions', () => {
  test('formatToDecimal formats number with specified precision', () => {
    expect(formatToDecimal(1000.5678)).toBe('1,000.57');
    expect(formatToDecimal(1000.5678, 3)).toBe('1,000.568');
    expect(formatToDecimal(1000, 0)).toBe('1,000');
    expect(formatToDecimal(0.5678, 4)).toBe('0.5678');
    expect(formatToDecimal(-500.123)).toBe('-500.12');
  });
});

describe('Percentage formatting functions', () => {
  test('formatToPercent formats number as percentage', () => {
    expect(formatToPercent(0.5)).toBe('50%');
    expect(formatToPercent(0.05)).toBe('5%');
    expect(formatToPercent(1)).toBe('100%');
    expect(formatToPercent(0)).toBe('0%');
  });

  test('parsePercentToNumber removes non-numeric characters except dots and commas, preserving negative sign', () => {
    expect(parsePercentToNumber('50%')).toBe('50');
    expect(parsePercentToNumber('5.5%')).toBe('5.5');
    expect(parsePercentToNumber('100%')).toBe('100');
    expect(parsePercentToNumber('-10%')).toBe('-10');
    expect(parsePercentToNumber('0%')).toBe('0');
  });
});