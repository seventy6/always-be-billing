import { BillingContext } from '../../utils/BillingContext';

describe('BillingContext', () => {
  test('BillingContext has the correct default values', () => {
    const defaultContext = BillingContext._currentValue;
    
    expect(defaultContext).toHaveProperty('billing');
    expect(defaultContext.billing).toHaveProperty('billingRate', '$100');
    expect(defaultContext.billing).toHaveProperty('billingHoursPerDay', '7.5');
    expect(defaultContext.billing).toHaveProperty('taxRate', '40%');
    expect(defaultContext.billing).toHaveProperty('currency', 'USD');
  });
});