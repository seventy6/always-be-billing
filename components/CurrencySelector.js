import { useState, useEffect } from "react";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

function CurrencySelector(props) {
  //useEffect(() => {}, [props]);
  //if (Object.keys(selectedItem).length === 0) return <></>;
  return (
    <Select
      name="curriences"
      options={props.currencyObject[0].options}
      placeholder="Select a currency..."
      closeMenuOnSelect={true}
      isSearchable={true}
      size="md"
      defaultValue={props.selectedItem}
      onChange={(valueString) => props.onChange(valueString)}
    />
  );
}
export default CurrencySelector;
