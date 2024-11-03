using System;
using System.Collections.Generic;

using BitCounting.Library;

using NUnit.Framework;

namespace BitCounting.Tests
{
    /// <summary>
    /// !!! WARNING
    /// !!! Project structure test
    /// !!! DON'T CHANGE IT!
    /// !!! Changes may cause the solution to be rejected.
    /// </summary>
    public class BitCounterTest
    {
	    private const int NUM_BITS = 9;

        private BitCounter CreateBitCounter()
        {
            return new BitCounter();
        }

        private void Validate(Dictionary<int, int> bitsCountedDictionary, int bitToCheck, int expectedValue)
        {
            Console.Write(expectedValue);

            bitsCountedDictionary.TryGetValue(bitToCheck, out var value);
            {
                if (value != expectedValue)
                {
                    Assert.Fail(
                        $"The count of {bitToCheck} \"on\" bits is incorrect. Value reported is {value}. Value should be {expectedValue}.");
                }
            }
        }

        private void RunTest(string testString, Dictionary<int, int> bitsCountedCompareDictionary)
        {
            Dictionary<int, int> bitsCountedDictionary = null;

            try
            {
                var bitCounter = CreateBitCounter();

                bitsCountedDictionary = bitCounter.CountBits(testString);
            }
            catch (Exception e)
            {
                Assert.Fail(e.Message);
            }

            // Verify the correct size of the dictionary
            if (bitsCountedDictionary == null || bitsCountedDictionary.Count != NUM_BITS)
            {
                Assert.Fail($"The dictionary of bits counted should have a size of {NUM_BITS}.");
            }

            // Verify all the bits
            for (var index = 0; index < NUM_BITS; index++)
            {
                Validate(bitsCountedDictionary, index, bitsCountedCompareDictionary[index]);
            }
        }

        /// <summary>
        /// !!! WARNING
        /// !!! Project structure test.
        /// !!! DON'T CHANGE IT!
        /// !!! Changes may cause the solution to be rejected.
        /// </summary>
        [Test]
        public void SmallStringTest()
        {
            var bitsCountedCompareDictionary = new Dictionary<int, int>
            {
                { 0, 0 }, { 1, 0 }, { 2, 16 }, { 3, 21 }, { 4, 32 }, { 5, 20 }, { 6, 9 }, { 7, 2 }, {8, 0}
            };

            RunTest(BitCounterTestString.SmallSizeString, bitsCountedCompareDictionary);
        }

        /// <summary>
        /// !!! WARNING
        /// !!! Project structure test.
        /// !!! DON'T CHANGE IT!
        /// !!! Changes may cause the solution to be rejected.
        /// </summary>
        [Test]
        public void LargeStringTest()
        {
            var bitsCountedCompareDictionary = new Dictionary<int, int>
            {
                { 0, 1895 }, { 1, 14656 }, { 2, 51231 }, { 3, 102797 }, { 4, 128848 }, { 5, 102649 }, { 6, 51435 },
                { 7, 14598 }, {8, 0}
            };

            RunTest(BitCounterTestString.LargeSizeString, bitsCountedCompareDictionary);
        }
    }
}
