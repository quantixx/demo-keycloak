/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { IsbnComponent } from '../../../../../../main/webapp/app/entities/isbn/isbn.component';
import { IsbnService } from '../../../../../../main/webapp/app/entities/isbn/isbn.service';
import { Isbn } from '../../../../../../main/webapp/app/entities/isbn/isbn.model';

describe('Component Tests', () => {

    describe('Isbn Management Component', () => {
        let comp: IsbnComponent;
        let fixture: ComponentFixture<IsbnComponent>;
        let service: IsbnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [IsbnComponent],
                providers: [
                    IsbnService
                ]
            })
            .overrideTemplate(IsbnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IsbnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IsbnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Isbn(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.isbns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
