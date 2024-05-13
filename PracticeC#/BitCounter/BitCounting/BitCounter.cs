using System;
using System.Collections.Generic;

/*
  
In this implementation, the CountSetBits method uses a bitwise approach to count the number of set bits (1 bits) in an integer. 
This implementation has a time complexity of O(1) since it iterates through a fixed number of bits (32) regardless of the input value. 
The space complexity is also O(1) as it uses a constant amount of additional space.
Note that this implementation assumes that the input values are unsigned 8-bit integers (0 to 255). 
If you need to handle signed integers or larger integer types, you may need to adjust the mask and the loop bounds accordingly.
*/

namespace BitCounting.Library
{
    public class BitCounter
    {
        public Dictionary<int, int> CountBits(string testString)
        {
            // we initialize the dictionary with all possible counts
            var bitCounts = new Dictionary<int, int>();

            // debug  against given example testString = "128 8 13 2 65 191";

            //safety check
            if (string.IsNullOrEmpty(testString))
                return bitCounts;

            //set all counts to 0
            for (int i = 0; i <= 8; i++)
            {
                bitCounts[i] = 0;
            }

            // split input string into individual numbers
            var numbers = testString.Split(' ');

            foreach (var number in numbers)
            {
                if (int.TryParse(number, out int value) && value >= 0 && value <= 255)
                {
                    // Calculate the number of 1 bits using a helper method
                    int numOnes = CountHowManyOnes(value);

                    // Update the dictionary
                    if (bitCounts.ContainsKey(numOnes))
                        bitCounts[numOnes]++;
                    else
                        bitCounts[numOnes] = 1;
                }
                else
                {
                    // if got an non-integer string
                    Console.WriteLine($"Invalid input: {number}");
                }
            }
            return bitCounts;
        }

        /*
        Initialize a mask variable with the value 0x00000001, which represents the bit pattern 00000000000000000000000000000001 in binary (the least significant bit is set).
        Iterate from 0 to 31 (32 bits in a 32-bit integer).

        In each iteration, perform a bitwise AND operation between the input number num and the mask (num & mask). 
        If the result is non-zero, it means that the corresponding bit is set, so increment the count.
        Shift the mask left by one position (mask <<= 1) to check the next bit in the subsequent iteration.
        After iterating through all 32 bits, return the final count.
        */

        private int CountHowManyOnes(int num)
        {
            int count = 0;
            uint mask = 0x00000001; // Mask for the least significant bit

            for (int i = 0; i < 32; i++)
            {
                if ((num & mask) != 0)
                {
                    count++;
                }
                mask <<= 1; // Shift the mask to the next bit position
            }

            return count;
        }
    }
}
