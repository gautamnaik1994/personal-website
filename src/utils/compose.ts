//https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i
export default <R>(fn1: (a: R) => R, ...fns: ((a: R) => R)[]) =>
  fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
