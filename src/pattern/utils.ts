import {makeBy} from 'fp-ts/es6/Array';
import * as uuid from 'uuid';

export const createIds = <K extends string>(length: number): Array<K> => makeBy(length, () => uuid.v4() as K);
