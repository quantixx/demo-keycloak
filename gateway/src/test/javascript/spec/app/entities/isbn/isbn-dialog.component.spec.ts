/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { IsbnDialogComponent } from '../../../../../../main/webapp/app/entities/isbn/isbn-dialog.component';
import { IsbnService } from '../../../../../../main/webapp/app/entities/isbn/isbn.service';
import { Isbn } from '../../../../../../main/webapp/app/entities/isbn/isbn.model';

describe('Component Tests', () => {

    describe('Isbn Management Dialog Component', () => {
        let comp: IsbnDialogComponent;
        let fixture: ComponentFixture<IsbnDialogComponent>;
        let service: IsbnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [IsbnDialogComponent],
                providers: [
                    IsbnService
                ]
            })
            .overrideTemplate(IsbnDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IsbnDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IsbnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Isbn(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.isbn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'isbnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Isbn();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.isbn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'isbnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
