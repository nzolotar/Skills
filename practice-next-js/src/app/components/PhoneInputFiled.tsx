//create input field for phone number so user can type only numbers but it formats to (132)456-7890
"use client";
import { useState } from "react";

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = (value: string) => {
    // Remove non-digit characters
    const input = value.replace(/\D/g, "");

    // Format the input
    const formattedInput = input.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");

    return formattedInput;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };
  return (
    <input
      type="text"
      value={phoneNumber}
      placeholder="Enter phone number"
      onChange={handlePhoneChange}
    />
  );
};
export default PhoneInput;
