function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }
  return true;
}

function memoize(resultFn, isEqual = areInputsEqual) {
  let lastThis;
  let lastArgs = [];
  let lastResult;
  let calledOnce = false;
  function memoized(...args) {
    const newArgs = [];
    // eslint-disable-next-line no-plusplus
    for (let a = 0; a < args.length; a++) {
      newArgs[a] = args[a];
    }
    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  return memoized;
}

export { memoize };
