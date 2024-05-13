# Bit Counter

## Introduction
In this test you will update a Bit Counter method that takes in a string of unsigned 8-bit integers and counts how many 1 bits each contains in the binary representation of that number.

## Your task
Update a Bit Counter method that takes as input a string of unsigned 8-bit integers and outputs the following:

1. A Dictionary where the Key is the number of 1's present in the binary representation of the integer and the Value is the running count of those integers.

### (1) Example
#### Example: Assume a file with the following contents: 128 8 13 2 65 191
The binary representations of these numbers are as follows: 10000000 00001000 00001101 00000010 01000001 10111111
So this file would result in the following Dictionary:

{ 0, 0 }, { 1, 3 }, { 2, 0 }, { 3, 1 }, { 4, 0 }, { 5, 0 }, { 6, 0 }, { 7, 1 }, { 8, 0 }

### (2) Considerations
- The only existing file you're allowed to modify is "BitCounter.cs".
- The strings being used to test against are contained in the BitCounterTestString class. Your program should be able to successfully process the strings called "SmallSizeString" and "LargeSizeString".
- Your Dictionary should contain key value pairs for all possible counts.
- Your solution should be fault-tolerant.
- Your solution should be optimized for execution time.
- You should be prepared to explain and defend your solution.
