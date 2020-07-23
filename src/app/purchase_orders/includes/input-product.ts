import { Component } from '@angular/core';

@Component({
  selector: 'nz-product-select-custom-dropdown-menu',
  template: `
    <nz-select nzShowSearch nzAllowClear [nzDropdownRender]="renderTemplate" nzPlaceHolder="Select Product">
      <nz-option *ngFor="let item of listOfItem" [nzLabel]="item" [nzValue]="item"></nz-option>
    </nz-select>
    <ng-template #renderTemplate>
      <nz-divider></nz-divider>
      <div class="container">        
        <a class="add-item"><i nz-icon nzType="plus"></i> Add New Product</a>
      </div>
    </ng-template>
  `,  
})
export class InputProductDropdownMenuComponent {
    listOfItem = ['Travel Set', 'Trial Set', 'Regular Set', 'Premium Set'];
  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [...this.listOfItem, input.value || `New item ${this.index++}`];
    }
  }
}