import { createContext } from "react";

export const BillingContext = createContext({
  billing: {
    billingRate: "$100",
    billingHoursPerDay: "7.5",
    taxRate: "40%",
  },
});
