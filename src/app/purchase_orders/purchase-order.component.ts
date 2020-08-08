import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './purchase-order.component.html'
})

export class PurchaseOrderComponent  {
    validateForm: FormGroup;
    @ViewChild('container', {read:ViewContainerRef}) container;
    @ViewChild('product') template: TemplateRef<any>;

    addItem() {
        this.container.createEmbeddedView(this.template);
    }

    removeItem(e) {
        let elem = e.target;
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches('.row.ng-star-inserted')) {
                elem.parentNode.removeChild(elem);
            }
        }
    }


}
