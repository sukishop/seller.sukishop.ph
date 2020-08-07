import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { expenses } from '../../models/expenseCategory';
import { account } from '../../models/account';
 
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenseCategoryUrl = 'http://business.test/v1/expense/category';
  accountUrl = 'http://business.test/v1/account/index';
  postExpenseUrl = 'http://business.test/v1/expense';
  accounts: [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient){}

  getCategories(): Observable<expenses[]> { 
    return this.http.get<expenses[]>(this.expenseCategoryUrl)
  }

  getAccounts(): Observable<account[]> { 
    return this.http.get<account[]>(this.accountUrl)
  }

  postExpenses(formData: any) {
    return this.http.post<expenses[]>(this.postExpenseUrl, formData,)
  }
}
