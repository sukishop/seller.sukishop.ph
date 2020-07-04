import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
    templateUrl: './purchase-order.component.html'
})

export class PurchaseOrderComponent  {
    validateForm: FormGroup;
    
}