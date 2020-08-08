import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './products-list.component';
import { ProductComponent } from './product.component';
import { ProductAddComponent } from './product-add.component';

import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Products',
            headerDisplay: "none"
        }

    },
    {
        path: 'view',
        component: ProductComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Product',
            headerDisplay: "none"
        }
    },
    {
        path: 'add',
        component: ProductAddComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Add Product',
            headerDisplay: "none"
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule { }
