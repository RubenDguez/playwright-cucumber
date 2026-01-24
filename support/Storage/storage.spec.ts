import test, { beforeEach, describe } from 'node:test';
import { LocalStorage, StorageError, WorkerStorage } from './Storage';
import assert from 'node:assert/strict';

for (const storage of [
  { name: 'Worker Storage', instance: WorkerStorage.instance },
  { name: 'Local Storage', instance: LocalStorage.instance },
]) {
  describe(storage.name, () => {
    const storageInstance = storage.instance;

    beforeEach(() => {
      storageInstance.clear();
    });

    test('should set and get an item successfully', () => {
      const key = 'key1';
      const value = 'value1';

      assert.doesNotThrow(() => {
        storageInstance.setItem(key, value);
        storageInstance.getItem(key);
      }, 'Expected no error when setting and getting an item');

      assert.strictEqual(storageInstance.getItem(key), value, 'Expected retrieved value to match the set value');
    });

    test('should throw error when setting an existing key', () => {
      const key = 'key1';
      const value = 'value1';

      assert.doesNotThrow(() => {
        storageInstance.setItem(key, value);
      }, 'Expected no error when setting an item');

      assert.throws(
        () => {
          storageInstance.setItem(key, 'value2');
        },
        /already exists/,
        'Expected error when setting an existing key'
      );

      assert.throws(
        () => {
          storageInstance.setItem(key, 'value2');
        },
        (error: Error) => {
          return error instanceof StorageError && /already exists/.test(error.message);
        },
        'Expected StorageError when setting an existing key'
      );
    });

    test('should update an existing item successfully', () => {
      const key = 'key1';
      const initialValue = 'value1';
      const newValue = 'updatedValue';

      assert.doesNotThrow(() => {
        storageInstance.setItem(key, initialValue);
        storageInstance.updateItem(key, newValue);
      }, 'Expected no error when updating an existing item');

      assert.strictEqual(storageInstance.getItem(key), newValue, 'Expected retrieved value to match the updated value');
    });

    test('should throw error when updating a non-existing key', () => {
      const key = 'nonExistingKey';
      const value = 'someValue';

      assert.throws(
        () => {
          storageInstance.updateItem(key, value);
        },
        /does not exist/,
        'Expected error when updating a non-existing key'
      );

      assert.throws(
        () => {
          storageInstance.updateItem(key, value);
        },
        (error: Error) => {
          return error instanceof StorageError && /does not exist/.test(error.message);
        },
        'Expected StorageError when updating a non-existing key'
      );
    });

    test('should remove an existing item successfully', () => {
      const key = 'key1';

      assert.doesNotThrow(() => {
        storageInstance.setItem(key, 'value1');
        storageInstance.removeItem(key);
      }, 'Expected no error when removing an existing item');

      assert.throws(
        () => {
          storageInstance.getItem(key);
        },
        /does not exist/,
        'Expected error when getting a removed key'
      );

      assert.throws(
        () => {
          storageInstance.getItem(key);
        },
        (error: Error) => {
          return error instanceof StorageError && /does not exist/.test(error.message);
        },
        'Expected StorageError when getting a removed key'
      );
    });

    test('should throw error when removing a non-existing key', () => {
      const key = 'nonExistingKey';

      assert.throws(
        () => {
          storageInstance.removeItem(key);
        },
        /does not exist/,
        'Expected error when removing a non-existing key'
      );

      assert.throws(
        () => {
          storageInstance.getItem(key);
        },
        (error: Error) => {
          return error instanceof StorageError && /does not exist/.test(error.message);
        },
        'Expected StorageError when removing a non-existing key'
      );
    });

    test('should clear all items successfully', () => {
      storageInstance.setItem('tempKey1', 'tempValue1');
      storageInstance.setItem('tempKey2', 'tempValue2');

      storageInstance.clear();
      assert.strictEqual(storageInstance.length(), 0, 'Expected storage to be empty after clear');
    });

    test('should return correct length of storage', () => {
      storageInstance.setItem('keyA', 'valueA');
      storageInstance.setItem('keyB', 'valueB');

      const length = storageInstance.length();
      assert.strictEqual(length, 2, 'Expected storage to have the correct length');
    });

    test('should convert storage to array correctly', () => {
      storageInstance.setItem('keyA', 'valueA');
      storageInstance.setItem('keyB', 'valueB');

      const itemsArray = storageInstance.toArray();
      assert.deepStrictEqual(
        itemsArray,
        [
          { key: 'keyA', value: 'valueA' },
          { key: 'keyB', value: 'valueB' },
        ],
        'Expected storage to array conversion to match the expected array'
      );
    });
  });
}
