export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Storage Error';
  }
}

abstract class StorageBase {
  protected storage: Map<string, string> = new Map();
  protected constructor() {}

  setItem(key: string, value: string): void {
    if (!key) throw new StorageError('Key cannot be empty');
    if (!value) throw new StorageError('Value cannot be empty');
    if (this.storage.has(key)) throw new StorageError(`Key "${key}" already exists. Use updateItem to modify existing keys.`);

    this.storage.set(key, value);
  }

  getItem(key: string): string {
    if (!key) throw new StorageError('Key cannot be empty');
    if (!this.storage.has(key)) throw new StorageError(`Key "${key}" does not exist in storage`);

    return this.storage.get(key) ?? '';
  }

  getItems(): Map<string, string> {
    return new Map(this.storage);
  }

  updateItem(key: string, value: string): void {
    if (!key) throw new StorageError('Key cannot be empty');
    if (!value) throw new StorageError('Value cannot be empty');
    if (!this.storage.has(key)) throw new StorageError(`Key "${key}" does not exist in storage`);

    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    if (!key) throw new StorageError('Key cannot be empty');
    if (!this.storage.has(key)) throw new StorageError(`Key "${key}" does not exist in storage`);

    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  length(): number {
    return this.storage.size;
  }

  toArray(): Array<{ key: string; value: string }> {
    if (this.storage.size === 0) return [];

    const result: Array<{ key: string; value: string }> = [];
    for (const [key, value] of this.storage.entries()) {
      result.push({ key, value });
    }
    return result;
  }
}

export class WorkerStorage extends StorageBase {
  private static _instance: WorkerStorage;
  public static get instance(): WorkerStorage {
    if (!this._instance) this._instance = new WorkerStorage();
    return this._instance;
  }
  private constructor() {
    super();
  }
}

export class LocalStorage extends StorageBase {
  private static _instance: LocalStorage;
  public static get instance(): LocalStorage {
    if (!this._instance) this._instance = new LocalStorage();
    return this._instance;
  }
  private constructor() {
    super();
  }
}
