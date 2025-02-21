/**
 * 
 * @function debounce
 * @param fn 
 * @param delay 
 * @author krisna
 * @returns 
 * 
 * delay: 250ms by default can be changed by passing a number as the second argument
 * fn: function to be debounced 
 * 
 * This function is used to debounce a function. It will wait for the delay to pass before calling the function.
 */

export default function debounce<T extends (...args: never[]) => void>(fn: T, delay = 250): T {
  let timeout: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;
}
