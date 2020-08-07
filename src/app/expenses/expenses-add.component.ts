import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ExpensesService } from '../shared/services/expenses.service'
import { expenses } from '../models/expenseCategory';
import { account } from '../models/account'
import {Location} from '@angular/common';

@Component({
  selector: 'app-expenses-add',
  templateUrl: './expenses-add.component.html',
  styleUrls: ['./expenses-add.component.css']
})
export class ExpensesAddComponent implements OnInit {
  size: NzButtonSize = 'large';
  selectedValue = null;
  validateForm!: FormGroup;
  categories: expenses[];
  accounts: account;
  postValue;
  isLoading = false;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
    this.postExpenses();


    console.log(this.validateForm.value)
    
    
    
   
  }
  constructor(private fb: FormBuilder, private expenseService: ExpensesService, private location: Location) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      remember: [true],
      expense_category_id: [null, [Validators.required]],
      account_id: [null, [Validators.required]],
    });
    this.getCategory();
    this.getAccounts();
  }

  getCategory(): void{
     this.expenseService.getCategories()
    .subscribe(categories => this.categories = categories['data']);
  }

  getAccounts(): void {
    this.expenseService.getAccounts()
    .subscribe(accounts => {this.accounts = accounts['data'],console.log(accounts)});
  }

  postExpenses(): void {
    this.expenseService.postExpenses(this.validateForm.value)
    .subscribe(postData => { 
      this.postValue = postData,console.log(postData);
      if(postData){
        this.location.back();
      }
    })
  }
}
