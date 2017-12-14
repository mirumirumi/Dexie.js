import { Dexie } from "./dexie";
import { Transaction } from "./transaction";
import { ThenShortcut } from "./then-shortcut";
import { TableSchema } from "./table-schema";
import { IndexSpec } from "./index-spec";
import { DexieExceptionClasses } from "./errors";
import { PromiseExtendedConstructor } from "./promise-extended";
import { DexieEventSet } from "./dexie-event-set";

export interface DexieOptions {
  addons?: Array<(db: Dexie) => void>,
  autoOpen?: boolean,
  indexedDB?: IDBFactory,
  IDBKeyRange?: {new(): IDBKeyRange}
}

export interface DexieConstructor extends DexieExceptionClasses {
  new(databaseName: string, options?: DexieOptions) : Dexie;
  prototype: Dexie;

  addons: Array<(db: Dexie) => void>;
  version: number;
  semVer: string;
  currentTransaction: Transaction;
  waitFor<T> (promise: PromiseLike<T> | T) : Promise<T>;
  waitFor<T> (promise: PromiseLike<T> | T, timeoutMilliseconds: number) : Promise<T>;

  getDatabaseNames(): Promise<string[]>;
  getDatabaseNames<R>(thenShortcut: ThenShortcut<string[],R>): Promise<R>;

  override<F> (origFunc:F, overridedFactory: (fn:any)=>any) : F; // ?
  getByKeyPath(obj: Object, keyPath: string): any;
  setByKeyPath(obj: Object, keyPath: string, value: any): void;
  delByKeyPath(obj: Object, keyPath: string): void;
  shallowClone<T> (obj: T): T;
  deepClone<T>(obj: T): T;
  asap(fn: Function) : void; //?
  maxKey: Array<Array<void>> | string;
  minKey: number;
  exists(dbName: string) : Promise<boolean>;
  delete(dbName: string): Promise<void>;
  dependencies: {
    indexedDB: IDBFactory,
    IDBKeyRange: IDBKeyRange
  };
  default: Dexie; // Work-around for different build tools handling default imports differently.

  Promise: PromiseExtendedConstructor;
  //TableSchema: {}; // Deprecate!
  //IndexSpec: {new():IndexSpec}; //? Deprecate
  Events: (ctx?)=>DexieEventSet;

  errnames: {[P in keyof DexieExceptionClasses]: P};
}
