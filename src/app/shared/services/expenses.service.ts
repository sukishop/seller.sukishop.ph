import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable, from  } from 'rxjs';
import { expensesCategory } from '../../models/expenseCategory';
import { expense } from '../../models/expense';
import { account } from '../../models/account';

import { UploadChangeParam } from 'ng-zorro-antd/upload';
import { filter, map, flatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenseCategoryUrl = 'http://business.test/v1/expense/category';
  expenseList = 'http://business.test/v1/expense/index';
  accountUrl = 'http://business.test/v1/account/index';
  postExpenseUrl = 'http://business.test/v1/expense';
  postImageUrl = 'http://business.test/v1/expense/upload';
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
}
