import { BaseEntity } from './../../shared';

export class Book implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public author?: string,
        public isbn?: string,
    ) {
    }
}
