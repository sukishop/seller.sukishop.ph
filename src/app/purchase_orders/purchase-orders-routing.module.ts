import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseOrdersListComponent } from './purchase-orders-list.component';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderViewComponent } from './purchase-order-view.component';

import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PurchaseOrdersListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Purchase Orders',
            headerDisplay: "none"
        }
        
    },
    {
        path: 'add',
        component: PurchaseOrderComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Add Purchase Order',
            headerDisplay: "none"
        }        
    },
    {
        path: 'view',
        component: PurchaseOrderViewComponent,
        canActivate: [AuthGuard],
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
