import { BaseEntity } from './../../shared';

export class Isbn implements BaseEntity {
    constructor(
        public id?: number,
        public isbnNumber?: string,
    ) {
    }
}
