export * from 'fp-ts/es6/Record';

// redeclared due to problems with nominally typed keys
export declare function deleteAt<K extends string>(k: K): <A>(r: Record<K, A>) => Record<K, A>;
