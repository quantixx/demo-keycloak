import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Isbn } from './isbn.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IsbnService {

    private resourceUrl =  SERVER_API_URL + '/isbn/api/isbns';

    constructor(private http: Http) { }

    create(isbn: Isbn): Observable<Isbn> {
        const copy = this.convert(isbn);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(isbn: Isbn): Observable<Isbn> {
        const copy = this.convert(isbn);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Isbn> {
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
     * Convert a returned JSON object to Isbn.
     */
    private convertItemFromServer(json: any): Isbn {
        const entity: Isbn = Object.assign(new Isbn(), json);
        return entity;
    }

    /**
     * Convert a Isbn to a JSON which can be sent to the server.
     */
    private convert(isbn: Isbn): Isbn {
        const copy: Isbn = Object.assign({}, isbn);
        return copy;
    }
}
