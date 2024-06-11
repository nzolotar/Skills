//create input field for phone number so user can type only numbers but it formats to (132)456-7890
"use client";
import React, { ChangeEvent, FocusEvent, useState } from "react";

const PhoneInputAdvanced: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue += "(" + value.substring(0, 3);
    }
    if (value.length >= 3) {
      formattedValue += ") " + value.substring(3, 6);
    }
    if (value.length >= 6) {
      formattedValue += "-" + value.substring(6);
    }

    setPhoneNumber(formattedValue);
  };
  return (
    <input
      placeholder="Enter phone number"
      value={isFocused ? phoneNumber.replace(/\D/g, "") : phoneNumber}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      maxLength={10}
      type="tel"
    />
  );
};
export default PhoneInputAdvanced;
