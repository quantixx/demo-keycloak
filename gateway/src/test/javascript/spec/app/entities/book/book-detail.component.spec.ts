/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GatewayTestModule } from '../../../test.module';
import { BookDetailComponent } from '../../../../../../main/webapp/app/entities/book/book-detail.component';
import { BookService } from '../../../../../../main/webapp/app/entities/book/book.service';
import { Book } from '../../../../../../main/webapp/app/entities/book/book.model';

describe('Component Tests', () => {

    describe('Book Management Detail Component', () => {
        let comp: BookDetailComponent;
        let fixture: ComponentFixture<BookDetailComponent>;
        let service: BookService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [BookDetailComponent],
                providers: [
                    BookService
                ]
            })
            .overrideTemplate(BookDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Book(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.book).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
