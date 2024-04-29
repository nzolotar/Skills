using System;
using System.Collections.Generic;

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
                if (int.TryParse(number, out int value))
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

        private int CountHowManyOnes(int num)
        {
            string binaryString = Convert.ToString(num, 2); // Convert to binary string
            int count = 0;

            foreach (char digit in binaryString)
            {
                if (digit == '1')
                    count++;
            }

            return count;
        }
    }
}
