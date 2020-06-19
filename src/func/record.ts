import {array} from 'fp-ts/es6/Array';
import {fromFoldable} from 'fp-ts/es6/Record';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

export * from 'fp-ts/es6/Record';

// redeclared due to problems with nominally typed keys
export declare function deleteAt<K extends string>(k: K): <A>(r: Record<K, A>) => Record<K, A>;

export const getFromEntries = <A, K extends string>(): (target: Array<[K, A]>) => Record<K, A> => fromFoldable(getLastSemigroup<A>(), array);
