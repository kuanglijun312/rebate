const cache = new Map();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrapPromise(promise: () => Promise<any>, cacheKey: string) {
  if (!cache.has(cacheKey)) {
    let status = 'pending';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;
    
    const suspender = promise().then(
      r => {
        status = 'success';
        result = r.data;
      },
      e => {
        status = 'error';
        result = e;
      }
    );
    
    cache.set(cacheKey, {
      read() {
        if (status === 'pending') {
          throw suspender;
        } else if (status === 'error') {
          cache.delete(cacheKey);
          throw result;
        } else if (status === 'success') {
          cache.delete(cacheKey);
          return result;
        }
      }
    });
  }
  return cache.get(cacheKey);
}