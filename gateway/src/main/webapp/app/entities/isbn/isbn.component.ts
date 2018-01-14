import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Isbn } from './isbn.model';
import { IsbnService } from './isbn.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-isbn',
    templateUrl: './isbn.component.html'
})
export class IsbnComponent implements OnInit, OnDestroy {
isbns: Isbn[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private isbnService: IsbnService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.isbnService.query().subscribe(
            (res: ResponseWrapper) => {
                this.isbns = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIsbns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Isbn) {
        return item.id;
    }
    registerChangeInIsbns() {
        this.eventSubscriber = this.eventManager.subscribe('isbnListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
