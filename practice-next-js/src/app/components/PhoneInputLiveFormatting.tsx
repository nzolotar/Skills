//create input field for phone number so user can type only numbers but it formats to (132)456-7890
"use client";
import { useEffect, useRef, useState } from "react";

const PhoneInputLiveFormatting = ({ maxLength = 10 }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef(0);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const size = numbers.length;

    if (size > maxLength) return value;

    const formattedValue = [];

    for (let i = 0; i < size; i++) {
      if (i === 0) {
        formattedValue.push("(");
      } else if (i === 3) {
        formattedValue.push(") ");
      } else if (i === 6) {
        formattedValue.push("-");
      }
      formattedValue.push(numbers[i]);
    }

    return formattedValue.join("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value);
    const selectionStart = e.target.selectionStart;
    const diff = formattedValue.length - value.length;

    setInput(formattedValue);

    if (selectionStart !== null) {
      cursorPositionRef.current = selectionStart + diff;
    } else {
      cursorPositionRef.current = formattedValue.length;
    }
  };

  const handleInputFocus = () => {
    setInput(input.replace(/\D/g, ""));
  };

  const handleInputBlur = () => {
    const formattedValue = formatPhoneNumber(input.replace(/\D/g, ""));
    setInput(formattedValue);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
      cursorPositionRef.current = inputRef.current.value.length;
    }
  }, [input]);

  return (
    <input
      ref={inputRef}
      maxLength={maxLength}
      type="tel"
      value={input}
      placeholder="Enter phone number"
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    />
  );
};
export default PhoneInputLiveFormatting;
