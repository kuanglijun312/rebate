type Task<T> = () => Promise<T>;

export async function concurrentRequests<T>(
  tasks: Task<T>[],
  maxConcurrent: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];
  
  for (const task of tasks) {
    const taskPromise = task().then(result => {
      results.push(result);
    });
    
    const promise = taskPromise.then(() => {
      executing.splice(executing.indexOf(promise), 1);
    });
    
    executing.push(promise);
    
    if (executing.length >= maxConcurrent) {
      await Promise.race(executing);
    }
  }
  
  await Promise.all(executing);
  return results;
}