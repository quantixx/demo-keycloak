import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail.component';
import { BookPopupComponent } from './book-dialog.component';
import { BookDeletePopupComponent } from './book-delete-dialog.component';

export const bookRoute: Routes = [
    {
        path: 'book',
        component: BookComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'book/:id',
        component: BookDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookPopupRoute: Routes = [
    {
        path: 'book-new',
        component: BookPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'book/:id/edit',
        component: BookPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'book/:id/delete',
        component: BookDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Books'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
