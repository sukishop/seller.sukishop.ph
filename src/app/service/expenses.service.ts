import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { expenseCategories } from '../models/expenseCategory';
import { catchError, map, tap, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenseCategoryUrl = 'http://business.test/v1/expense/category';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient){}

  getCategories(): Observable<expenseCategories[]> {
    return this.http.get<expenseCategories[]>(this.expenseCategoryUrl)
      // .pipe(
      //   map((data: any[]) => 
      //   data.map(
      //       (item: any) =>
      //         new expenseCategories(item.id, item.expense_category_name)
      //     )
      //   )
      // )
     
        // .map((res: Response ) => res.json())
     
      
  }
 
  
  // getCategories(): Observable
}
