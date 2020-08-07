import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'nz-vendor-select-custom-dropdown-menu',
  template: `
    <nz-select nzShowSearch nzAllowClear [nzDropdownRender]="renderTemplate" nzPlaceHolder="Select Vendor">
      <nz-option *ngFor="let item of listOfItem" [nzLabel]="item" [nzValue]="item"></nz-option>
    </nz-select>
    <ng-template #renderTemplate>
      <nz-divider></nz-divider>
      <div class="container">        
        <a class="add-item float-right" (click)="addVendor()"><i nz-icon nzType="plus"></i> Add New Vendor</a>
      </div>
    </ng-template>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Add Vendor" (nzOnCancel)="handleCancel()">
    <form nz-form style="width: 100%;">
      <div>    
        <nz-form-item>
            <nz-form-label>Vendor Name</nz-form-label>
            <input type="text" nz-input placeholder="Vendor Name" />       
        </nz-form-item>
        <nz-form-item>
            <nz-form-label>Company</nz-form-label>
            <input type="text" nz-input placeholder="Company" />       
        </nz-form-item>
        <nz-form-item> 
            <nz-form-label>Email</nz-form-label>
            <input type="text" nz-input placeholder="Email" />       
        </nz-form-item>
        <nz-form-item>
            <nz-form-label>Phone</nz-form-label>
            <input type="text" nz-input placeholder="" />       
        </nz-form-item>
        <nz-form-item>
            <nz-form-label>Address</nz-form-label>
            <textarea type="text" nz-input placeholder=""> </textarea>       
        </nz-form-item>       
      </div>  
   
      <div *nzModalFooter>        
        <button nz-button nzType="default" (click)="handleCancel()">Cancel</button>
        <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Submit</button>
      </div>
    </form>  
    </nz-modal>
  `,  
})
export class InputVendorDropdownMenuComponent {
      
  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalService: NzModalService) {}

  listOfItem = ['Kath Ong - BeauteFinds', 'Beautederm Head Office'];
  index = 0;
  addItem(input: HTMLInputElement): void {
  const value = input.value;
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [...this.listOfItem, input.value || `New item ${this.index++}`];
    }
  }

  addVendor(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
        this.isVisible = false;
        this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}