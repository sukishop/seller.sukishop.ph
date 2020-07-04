import { Component } from '@angular/core';
import { TableService } from '../shared/services/table.service';

interface DataItem {
    id: number;
    name: string;
    amount: number;
    expense_date: string;
    category: string;
    account:  string;
}

@Component({
    templateUrl: './expenses-list.component.html'
})

export class ExpensesListComponent  {

    selectedCategory: string;
    selectedStatus: string;
    searchInput: any;
    displayData = [];

    orderColumn = [
        {
            title: 'ID',
            compare: (a: DataItem, b: DataItem) => a.id - b.id,
        },        
        {
            title: 'Name',
            compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name)
        },
        {
            title: 'Amount',
            compare: (a: DataItem, b: DataItem) => a.amount - b.amount,
        },
        {
            title: 'Date',
            compare: (a: DataItem, b: DataItem) => a.expense_date.localeCompare(b.expense_date),
        },
        {
            title: 'Category',
            compare: (a: DataItem, b: DataItem) => a.category.localeCompare(b.category)
        },       
        {
            title: 'Account',
            compare: (a: DataItem, b: DataItem) => a.account.localeCompare(b.account),
        },       
        {
            title: ''
        }
    ]

    expensesList = [
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
        {
            id: 31,
            name: 'Bubble Wrap',
            amount: '5000',
            date: '06/20/2020',
            category: 'Operational Expenses',
            account: 'Cash On Hand',
        },
    ]  
    
    constructor(private tableSvc : TableService) {
        this.displayData = this.expensesList
    }

    search(): void {
        const data = this.expensesList
        this.displayData = this.tableSvc.search(this.searchInput, data )
    }

    categoryChange(value: string): void {
        const data = this.expensesList
        value !== 'All'? this.displayData = data.filter(elm => elm.category === value) : this.displayData = data
    }
}    