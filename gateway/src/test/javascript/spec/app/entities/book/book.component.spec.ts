/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { BookComponent } from '../../../../../../main/webapp/app/entities/book/book.component';
import { BookService } from '../../../../../../main/webapp/app/entities/book/book.service';
import { Book } from '../../../../../../main/webapp/app/entities/book/book.model';

describe('Component Tests', () => {

    describe('Book Management Component', () => {
        let comp: BookComponent;
        let fixture: ComponentFixture<BookComponent>;
        let service: BookService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [BookComponent],
                providers: [
                    BookService
                ]
            })
            .overrideTemplate(BookComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Book(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.books[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
