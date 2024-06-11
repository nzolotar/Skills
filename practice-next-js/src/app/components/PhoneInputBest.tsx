//create input field for phone number so user can type only numbers but it formats to (132)456-7890
"use client";
import { useEffect, useRef, useState } from "react";

const PhoneInputBest = ({ maxLength = 10 }) => {
  const [input, changeInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef(0);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const currentValue = target.value;
    const selectionStart = target.selectionStart;
    const numbers = target.value.replace(/\D/g, "");
    const size = numbers.length;

    if (size > maxLength) {
      return;
    }
    const formattedValue = [];

    //loop through the numbers and format them
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

    const diff = formattedValue.length - currentValue.length;
    if (selectionStart) {
      cursorPositionRef.current = selectionStart + diff;
    }

    changeInput(formattedValue.join(""));
  };

  //useEffect to set the carret position
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    }
  }, [inputRef]);

  return (
    <input
      ref={inputRef}
      maxLength={maxLength}
      type="tel"
      value={input}
      placeholder="Enter phone number"
      onChange={inputChange}
    />
  );
};
export default PhoneInputBest;
