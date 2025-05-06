import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

function CurrencySelector(props) {
  return (
    <Select
      defaultValue={props.selectedItem?.value}
      onValueChange={(value) => {
        const selectedOption = props.currencyObject[0].options.find(
          option => option.value === value
        );
        props.onChange(selectedOption);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a currency..." />
      </SelectTrigger>
      <SelectContent>
        {props.currencyObject[0].options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default CurrencySelector;
