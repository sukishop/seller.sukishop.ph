import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
    templateUrl: './product-add.component.html'
})

export class ProductAddComponent  {

    isEdit: boolean = false;
    productEditForm: FormGroup;
    previewImage: string = '';
    previewVisible: boolean = false;

    fileList = [];

    productData = {
        productName: '',
        price: 0,
        category: '',
        brand: 'Beautederm',
        status: '',
        size: ['S', ' M', ' L', ' XL'],
        colors: ['Dark Blue', 'Gray', 'Gray Blue'],
        fit: '',
        material: [],
        shipFrom: '',
        description: ''
    }

    constructor(private modalService: NzModalService, private fb: FormBuilder, private msg: NzMessageService) {
    }
    
    ngOnInit(): void {
        this.productEditForm = this.fb.group({
            productName:    [ this.productData.productName,     [ Validators.required ] ],
            price:          [ this.productData.price,           [ Validators.required ] ],
            category:       [ this.productData.category,        [ Validators.required ] ],
            brand:          [ this.productData.brand,           [ Validators.required ] ],
            status:         [ this.productData.status,          [ Validators.required ] ],
            size:           [ this.productData.size,            [ Validators.required ] ],
            colors:         [ this.productData.colors,          [ Validators.required ] ],
            fit:            [ this.productData.fit,             [ Validators.required ] ],
            material:       [ this.productData.material,        [ Validators.required ] ],
            shipFrom:       [ this.productData.shipFrom,        [ Validators.required ] ],
            description:    [ this.productData.description,     [ Validators.required ] ],
        });
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