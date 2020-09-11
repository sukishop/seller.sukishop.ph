import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ExpensesService } from '../shared/services/expenses.service'
import {Location} from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { expensesCategory } from '../shared/interfaces/expense';
import { account } from '../shared/interfaces/expense';

@Component({
  selector: 'app-expenses-add',
  templateUrl: './expenses-add.component.html',
  styleUrls: ['./expenses-add.component.css']
})
export class ExpensesAddComponent implements OnInit {
  size: NzButtonSize = 'large';
  selectedValue = null;
  validateForm: FormGroup;
  categories: expensesCategory[];
  accounts: account;
  postValue = [];
  isLoading = false;
  amountPlaceHolder= 'Enter Amount';
  selectedFile: any = null;
  uploadResponse = [];
  submitForm(): void {
    console.log(this.validateForm.value.image);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      
    }
    if(this.validateForm.status=="VALID"){
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    this.postExpenses();
    
    }
  }
  constructor(private fb: FormBuilder, private expenseService: ExpensesService, private location: Location, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      remember: [true],
      expense_category_id: [null, [Validators.required]],
      account_id: [null, [Validators.required]],
      image: [null]
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
    .subscribe(accounts => {this.accounts = accounts['data']});
  }

  postExpenses(): void {
    this.expenseService.postExpenses(this.validateForm.value)
    .subscribe(postData => { 
      this.postValue = postData;
      if(postData){
        setTimeout(() => {
        this.location.back();
        },3000);
      }
    })
  }
  onFileSelected(event)
  {
    this.selectedFile = <any>event.target.files[0];
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.expenseService.postImage(fd)
      .subscribe(res => {
        this.uploadResponse = res.data[0];
        this.validateForm.controls.image.setValue(res.data[0]);
        console.log(res.data[0]);
        console.log(this.uploadResponse);
        // this.validateForm.
      })
  }
}
