export const preserve = async <T>(
  promise: Promise<T> | null,
  promiseFunc: () => Promise<T>,
  setter: (val: T) => void,
  reset?: boolean,
): Promise<T> => {
  if (promise != null && !(reset ?? false)) {
    return promise;
  }
  promise = promiseFunc();
  promise.then(setter);
  return promise;
};
