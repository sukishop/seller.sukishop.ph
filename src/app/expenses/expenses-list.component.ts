import { Component, OnInit } from '@angular/core';
import { TableService } from '../shared/services/table.service';
import { ExpensesService } from '../shared/services/expenses.service';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { expense, expensesCategory } from '../shared/interfaces/expense'
import { NzTableQueryParams } from 'ng-zorro-antd/table';

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

    selectedCategory: number;
    selectedStatus: string;
    filterCategory=  [
        { text: 'dasd', value: '2' },
        { text: 'cat1', value: '1' }
    ];
    searchInput: any;
    displayData: [];
    expensesList: Observable<expense[]>;
    categories: Observable<expensesCategory[]>;
    totalList: number;
    pageIndex = 1;
    pageSize = 15;
    loading = true;   
    
     // Todo 
    // filter selection must be dynamic
    // times Stamps must be readable on the list
    constructor(private tableSvc : TableService, private expenseService: ExpensesService) {}
    

    search(): void {
        this.expenseService.searchByName(this.searchInput)
        .pipe(
            debounceTime(1000),
            distinctUntilChanged(),
        )
        .subscribe(result => {this.displayData = result['data']}) 
    }

    ngOnInit(): void {
        this.getCategory();
        this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, [])
        
    }

    getCategory(): void{
        this.expenseService.getCategories()
       .subscribe(categories => this.categories = categories['data']);
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex, sort, filter } = params;
        const currentSort = sort.find(item => item.value !== null);
        const sortField = (currentSort && currentSort.key) || null;
        const sortOrder = (currentSort && currentSort.value) || null;
        this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
    }

    loadDataFromServer(
        pageIndex: number, 
        pageSize: number, 
        sortField: string | null, 
        sortOrder: string | null,
        filter: Array<{ key: string; value: string[] }>): void {
        this.expenseService.paginationList(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
            this.loading = false;
            this.displayData = data['data'];
            if (data){
                this.totalList = data['total']
            }
            if(data['meta'].total){
                this.totalList = data['meta'].total;
            }  

        });
      }
}    