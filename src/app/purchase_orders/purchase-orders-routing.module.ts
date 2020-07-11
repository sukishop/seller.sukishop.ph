import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseOrdersListComponent } from './purchase-orders-list.component';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderViewComponent } from './purchase-order-view.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseOrdersListComponent,
        data: {
            title: 'Purchase Orders',
            headerDisplay: "none"
        }
        
    },
    {
        path: 'add',
        component: PurchaseOrderComponent,
        data: {
            title: 'Add Purchase Order',
            headerDisplay: "none"
        }        
    },
    {
        path: 'view',
        component: PurchaseOrderViewComponent,
        data: {
            title: 'View Purchase Order',
            headerDisplay: "none"
        }        
    },        
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PurchaseOrdersRoutingModule { }
