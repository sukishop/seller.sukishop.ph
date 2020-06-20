import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesListComponent } from './expenses-list.component';

const routes: Routes = [
    {
        path: '',
        component: ExpensesListComponent,
        data: {
            title: 'Expenses',
            headerDisplay: "none"
        }
        
    },       
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExpensesRoutingModule { }
