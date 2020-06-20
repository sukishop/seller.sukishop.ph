import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './products-list.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        data: {
            title: 'Products',
            headerDisplay: "none"
        }
        
    },
    {
        path: 'view',        
        component: ProductComponent,
        data: {
            title: 'Product',
            headerDisplay: "none"
        }
    },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppsRoutingModule { }
