//https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i
export default <T extends any[], R>(
  fn1: (...args: T) => R,
  ...fns: ((a: R) => R)[]
) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    (value) => value,
  );
  return (...args: T) => piped(fn1(...args));
};
