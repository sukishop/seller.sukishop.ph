import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
    templateUrl: './product.component.html'
})

export class ProductComponent  {

    isEdit: boolean = false;
    productEditForm: FormGroup;
    previewImage: string = '';
    previewVisible: boolean = false;

    fileList = [
        {
            uid: -1,
            name: 'travel.jpg',
            status: 'done',
            url: 'assets/images/product/travel-set-2.jpg'
        },
        {
            uid: 0,
            name: 'product-2.jpg',
            status: 'done',
            url: 'assets/images/product/travel-set-3.jpg'
        },
        {
            uid: 1,
            name: 'product-3.jpg',
            status: 'done',
            url: 'assets/images/product/travel-set-4.jpg'
        }
    ];

    productData = {
        productName: 'Travel Set',
        price: 1000,
        category: 'Facial Care',
        brand: 'Beautederm',
        status: 'In Stock',
        size: ['S', ' M', ' L', ' XL'],
        colors: ['Dark Blue', 'Gray', 'Gray Blue'],
        fit: 'Skinny',
        material: ['Polyester'],
        shipFrom: 'Columbia',
        description: '<p><span style="color: rgb(114, 132, 154);">Travel Set is good for 15 days Orange Papaine Soap – composed of orange peel and papaya extracts infused with vit. C, leaves skin flawless, blemish free whiter and younger skin. Day and Night Toner – has micro peeling effect that reveals young fresh and youthful new skin Day Cream – has spf 60 and natural zinc oxide to block harmful uva and uvb rays. Night Cream 1 (whitening) – helps reduce visible signs of aging and dark spots/melasma. Helps gets rid of pimples and pimple scars. Night Cream 2 (moisturizing) – non greasy gel form helps moisturize renew and repair aging skin.  Night Cream 3 (anti-aging) – improves skin elasticity. Slows down aging and reduces visibility of fine lines and wrinkles</span></p>'
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