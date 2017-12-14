import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IsbnComponent } from './isbn.component';
import { IsbnDetailComponent } from './isbn-detail.component';
import { IsbnPopupComponent } from './isbn-dialog.component';
import { IsbnDeletePopupComponent } from './isbn-delete-dialog.component';

export const isbnRoute: Routes = [
    {
        path: 'isbn',
        component: IsbnComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Isbns'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'isbn/:id',
        component: IsbnDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Isbns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const isbnPopupRoute: Routes = [
    {
        path: 'isbn-new',
        component: IsbnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Isbns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'isbn/:id/edit',
        component: IsbnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Isbns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'isbn/:id/delete',
        component: IsbnDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Isbns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
