import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpensesService } from '../shared/services/expenses.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {
  expense: any;
  image:any;
  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpensesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getExpense();
  }

  getExpense(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.expenseService.getExpense(id)
      .subscribe((response:any) => {this.expense = response.data})
    
  }

  getImage(image: any): void {
    this.expenseService.getImage(image)
      .subscribe((image:any) => this.image = image);
  }
}
