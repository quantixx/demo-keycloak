import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Isbn } from './isbn.model';
import { IsbnPopupService } from './isbn-popup.service';
import { IsbnService } from './isbn.service';

@Component({
    selector: 'jhi-isbn-delete-dialog',
    templateUrl: './isbn-delete-dialog.component.html'
})
export class IsbnDeleteDialogComponent {

    isbn: Isbn;

    constructor(
        private isbnService: IsbnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.isbnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'isbnListModification',
                content: 'Deleted an isbn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-isbn-delete-popup',
    template: ''
})
export class IsbnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private isbnPopupService: IsbnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.isbnPopupService
                .open(IsbnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
