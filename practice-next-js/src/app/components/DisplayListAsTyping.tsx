"use client";
import { useEffect, useRef, useState } from "react";

export const fruits = ["apple", "banana", "cherry", "date", "elderberry"];
const DisplayListAsTyping = () => {
  return (
    <div>
      <h1>Display List As Typing</h1>
      <input type="text" placeholder="Search here.." />
    </div>
  );
};
export default DisplayListAsTyping;
