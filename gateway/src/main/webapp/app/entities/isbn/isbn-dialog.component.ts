import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Isbn } from './isbn.model';
import { IsbnPopupService } from './isbn-popup.service';
import { IsbnService } from './isbn.service';

@Component({
    selector: 'jhi-isbn-dialog',
    templateUrl: './isbn-dialog.component.html'
})
export class IsbnDialogComponent implements OnInit {

    isbn: Isbn;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private isbnService: IsbnService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.isbn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.isbnService.update(this.isbn));
        } else {
            this.subscribeToSaveResponse(
                this.isbnService.create(this.isbn));
        }
    }

    private subscribeToSaveResponse(result: Observable<Isbn>) {
        result.subscribe((res: Isbn) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Isbn) {
        this.eventManager.broadcast({ name: 'isbnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-isbn-popup',
    template: ''
})
export class IsbnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private isbnPopupService: IsbnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.isbnPopupService
                    .open(IsbnDialogComponent as Component, params['id']);
            } else {
                this.isbnPopupService
                    .open(IsbnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
