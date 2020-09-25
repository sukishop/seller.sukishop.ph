import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { expensesCategory } from '../interfaces/expense';
import { expense, account, image } from '../interfaces/expense';

import { filter, map, flatMap, debounceTime, distinctUntilChanged, debounce, tap, catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenseCategoryUrl = 'http://business.test/v1/expense/category';
  expenseList = 'http://business.test/v1/expense/index';
  accountUrl = 'http://business.test/v1/account/index';
  postExpenseUrl = 'http://business.test/v1/expense';
  postImageUrl = 'http://business.test/v1/expense/upload';
  searchByNameUrl = 'http://business.test/v1/expense/index?name=';
  searchByCategoryUrl = 'http://business.test/v1/expense/index?expense_category_id=';
  paginationUrl = "http://business.test/v1/expense/index?page=";
  expenseDetailUrl = "http://business.test/v1/expense/";
  imageUrl = "http://business.test/v1/file/image/";
  accounts: [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  imagePost = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  }
  constructor(private http: HttpClient,){}

  getCategories(): Observable<expensesCategory[]> { 
    return this.http.get<expensesCategory[]>(this.expenseCategoryUrl)
  }

  getAccounts(): Observable<account[]> { 
    return this.http.get<account[]>(this.accountUrl)
  }

  postExpenses(formData: any) {
    return this.http.post<expense[]>(this.postExpenseUrl, formData, this.httpOptions)
  }
  
  postImage(image: any):  Observable<any>{ 
    return this.http.post(this.postImageUrl,image)
  }
  
  getList(): Observable<expense[]> {
    return this.http.get<expense[]>(this.expenseList);
  }

  searchByName(name: string) : Observable<expense[]> {
    return this.http.get<expense[]>(this.searchByNameUrl+name).pipe(
      debounceTime(1000))
    
  }

  getExpense(id: number): Observable<expense> {
    const url = `${this.expenseDetailUrl}+${id}`;
    return this.http.get<expense>(url);
  }

  getImage(image: any): Observable<image> {
    const path = `${this.imageUrl}+${image}`;
    return this.http.get<image>(path);
  }

  paginationList(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: expense[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);

    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });

    return this.http.get<{ results: expense[] }>(`${this.expenseList}`, { params });
  }
  
}
