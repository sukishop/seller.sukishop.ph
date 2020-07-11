import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile } from 'ng-zorro-antd/upload';
import { TableService } from '../shared/services/table.service';

interface DataItem {    
    name: string;    
    price: number;
    quantity: number;
    amount: number;    
}

@Component({
    templateUrl: './purchase-order-view.component.html'
})

export class PurchaseOrderViewComponent  {

    isEdit: boolean = false;
    productEditForm: FormGroup;
    previewImage: string = '';
    previewVisible: boolean = false;

    selectedCategory: string;
    selectedStatus: string;
    searchInput: any;
    displayData = [];

    orderColumn = [   
        {
            title: ''
        },     
        {
            title: 'Product',
            compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name)
        },        
        {
            title: 'Price',
            compare: (a: DataItem, b: DataItem) => a.price - b.price,
        },
        {
            title: 'Quantity',
            compare: (a: DataItem, b: DataItem) => a.quantity - b.quantity,
        },
        {
            title: 'Amount',
            compare: (a: DataItem, b: DataItem) => a.amount - b.amount,
        },                   
    ]

    productsList = [
        {
            name: 'Travel Set',
            avatar: 'assets/images/product/travel.jpg',            
            price: 500,
            quantity: 23,
            amount: 11500,
            checked : false
        },
        {
            name: 'Trial Set',
            avatar: 'assets/images/product/trial.jpg',
            price: 700,
            quantity: 56,
            amount: 39200,
            checked : false
        },
        {
            name: 'Regular Set',
            avatar: 'assets/images/product/regular.jpg',
            price: 1000,
            quantity: 56,
            amount: 56200,
            checked : false
        },
        {
            name: 'Premium Set',
            avatar: 'assets/images/product/premium.jpg',
            price: 3000,
            quantity: 56,
            amount: 56200,
            checked : false
        },
        {
            name: 'Micellaire',
            avatar: 'assets/images/product/beautederm-micellaire.jpg',
            price: 300,
            quantity: 56,
            amount: 56200,
            checked : false
        },
        
    ]  
    
    search(): void {
        const data = this.productsList
        this.displayData = this.tableSvc.search(this.searchInput, data )
    } 

    constructor(private modalService: NzModalService, private fb: FormBuilder, private msg: NzMessageService, private tableSvc : TableService) {
    }
    
    ngOnInit(): void {
        this.displayData = this.productsList; 
    }

    submitForm(): void {
        for (const i in this.productEditForm.controls) {
            this.productEditForm.controls[ i ].markAsDirty();
            this.productEditForm.controls[ i ].updateValueAndValidity();
        }
    }

    edit() {
        this.isEdit = true;
    }

    editClose() {
        this.isEdit = false;
    }

    save() {
        this.modalService.confirm({
            nzTitle  : '<i>Do you want your changes?</i>',
            nzOnOk   : () => this.editClose()
        });
    }

    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    }

    editorConfig = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],  
            [{ 'align': [] }],
            ['link', 'image']                        
        ]
    };
}