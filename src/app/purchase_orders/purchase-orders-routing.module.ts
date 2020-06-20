import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseOrdersListComponent } from './purchase-orders-list.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseOrdersListComponent,
        data: {
            title: 'Purchase Orders',
            headerDisplay: "none"
        }
        
    },       
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PurchaseOrdersRoutingModule { }
