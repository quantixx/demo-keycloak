import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    IsbnService,
    IsbnPopupService,
    IsbnComponent,
    IsbnDetailComponent,
    IsbnDialogComponent,
    IsbnPopupComponent,
    IsbnDeletePopupComponent,
    IsbnDeleteDialogComponent,
    isbnRoute,
    isbnPopupRoute,
} from './';

const ENTITY_STATES = [
    ...isbnRoute,
    ...isbnPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IsbnComponent,
        IsbnDetailComponent,
        IsbnDialogComponent,
        IsbnDeleteDialogComponent,
        IsbnPopupComponent,
        IsbnDeletePopupComponent,
    ],
    entryComponents: [
        IsbnComponent,
        IsbnDialogComponent,
        IsbnPopupComponent,
        IsbnDeleteDialogComponent,
        IsbnDeletePopupComponent,
    ],
    providers: [
        IsbnService,
        IsbnPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayIsbnModule {}
