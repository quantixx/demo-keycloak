import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Isbn } from './isbn.model';
import { IsbnService } from './isbn.service';

@Component({
    selector: 'jhi-isbn-detail',
    templateUrl: './isbn-detail.component.html'
})
export class IsbnDetailComponent implements OnInit, OnDestroy {

    isbn: Isbn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private isbnService: IsbnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIsbns();
    }

    load(id) {
        this.isbnService.find(id).subscribe((isbn) => {
            this.isbn = isbn;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIsbns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'isbnListModification',
            (response) => this.load(this.isbn.id)
        );
    }
}
