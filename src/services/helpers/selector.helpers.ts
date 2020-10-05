import { createSelectorCreator } from 'reselect';
import { shallowEqual } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defaultEqualityCheck(a: any, b: any) {
  return a === b;
}

function resultCheckMemoize<F extends Function>(
  func: F,
  resultCheck = defaultEqualityCheck,
  argsCheck = defaultEqualityCheck
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastArgs: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastResult: any = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output = (...args: any[]) => {
    if (
      lastArgs !== null &&
      lastArgs.length === args.length &&
      args.every((value, index) => argsCheck(value, lastArgs[index]))
    ) {
      return lastResult;
    }
    lastArgs = args;
    const result = func(...args);

    return resultCheck(lastResult, result) ? lastResult : (lastResult = result);
  };

  return (output as unknown) as F;
}

/**
 * Create selector that return complex data structures, such as array or object
 */
export const createObjectSelector = createSelectorCreator(resultCheckMemoize, shallowEqual);
