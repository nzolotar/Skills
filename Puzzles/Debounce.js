/*
 * https://frontendeval.com/questions/debounce
 *
 * Implement a barebones debounce function
 * It should log "Hello (3)", "Hello (4)", "Hello (6)"
 * the debounce function ensures that the callback function is not called more often than the interval time.
 */
const myCallback = (delay) => console.log(`Hello (${delay})`);

function debounce(callback, interval) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    //clears the previous timer and effectively cancels the previous callback function call
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, interval);
  };
}

const myDebouncedCallback = debounce(myCallback, 1000);
// call function immediately (after 0ms)
myDebouncedCallback(1);

// call function after 100ms
setTimeout(() => myDebouncedCallback(2), 100);

// call function after 500ms
setTimeout(() => myDebouncedCallback(3), 500);

// call function after 2000ms
setTimeout(() => myDebouncedCallback(4), 2000);

// call function after 4000ms
setTimeout(() => myDebouncedCallback(5), 4000);

// call function after 4500ms
setTimeout(() => myDebouncedCallback(6), 4500);

function throttle(callback, limit) {
  let flag = true; //execute
  return function () {
    let context = this,
      args = arguments;
    if (flag) {
      callback.apply(context, args);
      flag = false;
    }
    setTimeout(() => {
      flag = true;
    }, limit);
  };
}

//throttle function
const betterFunction = throttle(myCallback, 1000);
betterFunction("ABC");
