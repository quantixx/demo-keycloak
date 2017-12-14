import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Book } from './book.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BookService {

    private resourceUrl = '/book/api/books';

    constructor(private http: Http) { }

    create(book: Book): Observable<Book> {
        const copy = this.convert(book);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(book: Book): Observable<Book> {
        const copy = this.convert(book);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Book> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Book.
     */
    private convertItemFromServer(json: any): Book {
        const entity: Book = Object.assign(new Book(), json);
        return entity;
    }

    /**
     * Convert a Book to a JSON which can be sent to the server.
     */
    private convert(book: Book): Book {
        const copy: Book = Object.assign({}, book);
        return copy;
    }
}
