// Next fibonacci number = previous + one before previous
// fib(n) = fib(n - 1) + fib(n - 2);
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function fibonacci(n) {
  if (n == null) throw new Error("Number please!");
  if (n < 0) throw new Error("Incorrect number in a Fibonacci sequence");
  if (n <= 1) {
    return n;
  }
  const result = [0, 1];
  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 2] + result[i - 1];
  }
  return result[result.length - 1];
}
//The time complexity for this solution is linear - O(n), because we run the loop from 2 to n.
//The space complexity is O(1) because it does not matter if we run fibonacci(10) or fibonacci(100), the space required remains the same.

const calculateArray = (arr) => {
  return arr.map((n) => fibonacci(n));
};

console.log("Fibonacci", arr, calculateArray(arr));

//Optimized Recursive Solution
//The time complexity for this solution is linear - O(n),
//since we ensure that the function is executed only once per given index and the result
//is later returned from the cache. The space complexity remains the same and is equal to O(n).

let cache = [];

const fibonacciCached = (n) => {
  if (n <= 1) {
    return n;
  }

  if (cache[n]) {
    return cache[n];
  }

  const result = fibonacci(n - 1) + fibonacci(n - 2);

  cache[n] = result;

  return result;
};
const calculateArrayCached = (arr) => {
  return arr.map((n) => fibonacciCached(n));
};
console.log("Fibonacci cached", arr, calculateArrayCached(arr));
