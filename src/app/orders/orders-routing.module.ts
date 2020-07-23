import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceComponent } from './invoice.component';
import { OrdersListComponent } from './orders-list.component';

const routes: Routes = [
    {
        path: '',
        component: OrdersListComponent,
        data: {
            title: 'Orders',
            headerDisplay: "none"
        }
        
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
            title: 'Invoice',
            headerDisplay: "none"
        }        
    },      
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule { }
