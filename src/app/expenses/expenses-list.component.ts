import { Component, OnInit } from '@angular/core';
import { TableService } from '../shared/services/table.service';
import { ExpensesService } from '../shared/services/expenses.service';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
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
    filterCategory = []
    searchInput: any;
    displayData: [];
    expensesList: Observable<expense[]>;
    categories: Observable<expensesCategory[]>;
    totalList: number;
    pageIndex = 1;
    pageSize = 15;
    loading = true;
    totalExpense: number;
    totalExpensesCurrentMonth: number;
    totalWeek: number;
    totalExpensesCurrentDay: number;
     // Todo 
    // times Stamps must be readable on the list
    // total expenses(month,day,week,overAll)
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
        this.overAllExpenses();
        this.currentMonthExpenses();
        this.currentDayExpenses();
        this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, [])
        
    }

    getCategory(): void{

        this.expenseService.getCategories().pipe(map((value:any) => {

            return value.data.map(res => {

                return {text: res.expense_category_name, value: res.id};

            })
        }))

       .subscribe(categories => this.filterCategory = categories);

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

    overAllExpenses() {
        /** Get all Expense */
        this.expenseService.getOverAllExpenses().pipe(
            map((res:any) =>{
               return res.data.map( (data:any) => {
                    return data.amount 
                })
            })
        )
        .subscribe(res =>{
                    const reducer = (total:number, amountValue:number) => total + amountValue;
                    this.totalExpense = res.reduce(reducer)
                })
    }

    currentMonthExpenses() {
        this.expenseService.getCurrentMonthExpenses().pipe(
            map((res:any) =>{
                return res.map((data:any) => {
                    return data.amount
                })
            })
        ).subscribe(res =>{
            const reducer = (total:number, amountValue:number) => total + amountValue;
            this.totalExpensesCurrentMonth = res.reduce(reducer);
        })
    }

    currentDayExpenses() {
        this.expenseService.getCurrentDayExpenses(
            
        ).pipe(
            map((res:any) =>{
                console.log(res)
                return res.map((data:any) => {
                    return data.amount
                })
            })
        ).subscribe(res =>{
            const reducer = (total:number, amountValue:number) => total + amountValue;
            this.totalExpensesCurrentDay = res.reduce(reducer);
        })
    }
}    