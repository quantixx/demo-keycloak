/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GatewayTestModule } from '../../../test.module';
import { IsbnDetailComponent } from '../../../../../../main/webapp/app/entities/isbn/isbn-detail.component';
import { IsbnService } from '../../../../../../main/webapp/app/entities/isbn/isbn.service';
import { Isbn } from '../../../../../../main/webapp/app/entities/isbn/isbn.model';

describe('Component Tests', () => {

    describe('Isbn Management Detail Component', () => {
        let comp: IsbnDetailComponent;
        let fixture: ComponentFixture<IsbnDetailComponent>;
        let service: IsbnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [IsbnDetailComponent],
                providers: [
                    IsbnService
                ]
            })
            .overrideTemplate(IsbnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IsbnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IsbnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Isbn(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.isbn).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
