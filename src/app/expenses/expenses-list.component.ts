import { Component, OnInit } from '@angular/core';
import { TableService } from '../shared/services/table.service';
import { ExpensesService } from '../shared/services/expenses.service';
import { debounceTime, tap } from 'rxjs/operators';




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

export class ExpensesListComponent implements OnInit  {

    selectedCategory: string;
    selectedStatus: string;
    searchInput: any;
    displayData = [];
    expensesList = [];
    categories = [];
    totalList = '';
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

    
    
    constructor(private tableSvc : TableService, private expenseService: ExpensesService) {
       

        // console.log(this.displayData)
        // this.totalList = this.totalList.total;
       
    }
    ngOnInit(): void {
        
        this.getCategory();
        this.getAll();
       
        
        
    }

    search(): void {
        this.expenseService.searchByName(this.searchInput)
        .subscribe(result => {this.displayData = result['data']}) 
        // debounce doesn't work */
    }

    categoryChange(value: string): void {
        const data = this.expensesList;
        value !== 'All'? this.displayData = data.filter(elm => elm.expense_category_id == value) : this.displayData = data
    }

    getAll() {
       this.expenseService.getList()
        .subscribe(list => {this.expensesList = list['data'],this.displayData = list['data'] ,this.totalList = list['meta']});
    }

    getCategory(): void{
        this.expenseService.getCategories()
       .subscribe(categories => this.categories = categories['data']);
    }

   
}    