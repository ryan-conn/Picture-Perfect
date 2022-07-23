const callbacks = new Map<string, () => any>;

export function throttle(id: string, frequency: number, callback: () => any) {
  const alreadyHasCallback = callbacks.has(id);

  // Update callback for the provided id
  callbacks.set(id, callback);

  // Schedule callback to run if it isn't already scheduled
  if (!alreadyHasCallback) {
    // TODO: if frequency is changed, it isn't updated. If I want that functionality it needs to be implemented
    setTimeout(() => {
      const toRun = callbacks.get(id);
      if (toRun) toRun();
      callbacks.delete(id);
    }, frequency);
  }
}
