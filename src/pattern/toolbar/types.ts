import {either} from 'fp-ts/es6/Either';
import * as t from 'io-ts';

export const IntFromString = new t.Type<number, string, unknown>(
    'IntFromString',
    (unknown): unknown is number => typeof unknown === 'number' &&  Number.isInteger(unknown),
    (unknown, context) => either.chain(t.string.validate(unknown, context), unknownString => {
        const result = parseInt(unknownString, 10);
        return isNaN(result) ? t.failure(unknown, context) : t.success(result);
    }),
    (integer) => String(integer),
);
