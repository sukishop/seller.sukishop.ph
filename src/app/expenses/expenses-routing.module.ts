import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesListComponent } from './expenses-list.component';
import { ExpensesAddComponent }  from './expenses-add.component';
const routes: Routes = [
    {
        path: '',
        component: ExpensesListComponent,
        data: {
            title: 'Expenses',
            headerDisplay: "none"
        }
        
    },
    {
        path: 'add',
        component: ExpensesAddComponent,
        data: {
            title: 'Add Expenses',
            headerDisplay: "none"
        }
        
    },           
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExpensesRoutingModule { }
