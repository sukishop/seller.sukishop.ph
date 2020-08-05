import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ExpensesService } from '../service/expenses.service'
import { expenseCategories } from '../models/expenseCategory';
@Component({
  selector: 'app-expenses-add',
  templateUrl: './expenses-add.component.html',
  styleUrls: ['./expenses-add.component.css']
})
export class ExpensesAddComponent implements OnInit {
  size: NzButtonSize = 'large';
  selectedValue = null;
  validateForm!: FormGroup;
  categories: expenseCategories[];
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value)
  }
  constructor(private fb: FormBuilder, private expenseService: ExpensesService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      remember: [true],
      category: [null, [Validators.required]],
    });
    this.getCategory();
  }

  getCategory(): void{
     this.expenseService.getCategories()
    .subscribe(categories => { this.categories = categories['data'] ;console.log(categories['data']);});
  }

}
