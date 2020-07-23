import { Component } from '@angular/core';
import { TableService } from '../shared/services/table.service';

interface DataItem {
    date: string;
    po_num: number;
    vendor: string;
    amount: number;    
    payment_status:  string;
    order_status: string;
}

@Component({  
    templateUrl: './purchase-orders-list.component.html'
})

export class PurchaseOrdersListComponent  {

    selectedCategory: string; 
    selectedStatus: string;
    searchInput: any;
    displayData = []; 

    orderColumn = [        
        {
            title: 'Order date',
            compare: (a: DataItem, b: DataItem) => a.date.localeCompare(b.date)
        },
        {
            title: 'PO #',
            compare: (a: DataItem, b: DataItem) => a.po_num - b.po_num,
        },
        {
            title: 'Vendor',
            compare: (a: DataItem, b: DataItem) => a.vendor.localeCompare(b.vendor)
        },
        {
            title: 'Amount',
            compare: (a: DataItem, b: DataItem) => a.amount - b.amount,
        },        
        {
            title: 'Payment Status',
            compare: (a: DataItem, b: DataItem) => a.payment_status.localeCompare(b.payment_status)
        },
        {
            title: 'Purchase Status',
            compare: (a: DataItem, b: DataItem) => a.order_status.localeCompare(b.order_status)
        },
        {
            title: ''
        }
    ]

    purchaseOrdersList = [
        {
            date: '06/20/2020',              
            vendor: 'Kath Ong - BeauteFinds',
            amount: 100000,            
            payment_status: 'Paid',            
            order_status: 'Delivered',
            po_num: 1001,          
        },
        {
            date: '06/10/2020',            
            vendor: 'Beautederm - Head Office',
            amount: 100000,            
            payment_status: 'Paid',            
            order_status: 'Delivered',
            po_num: 1001,            
        },
        {
            date: '06/01/2020',            
            vendor: 'Beautederm - Head Office',
            amount: 100000,            
            payment_status: 'Paid',            
            order_status: 'Delivered',
            po_num: 1001,            
        },
        {
            date: '05/28/2020',            
            vendor: 'Beautederm Head Office',
            amount: 100000,            
            payment_status: 'Paid',            
            order_status: 'Delivered',
            po_num: 1001,            
        },
        {
            date: '05/20/2020',            
            vendor: 'Beautederm Head Office',
            amount: 100000,            
            payment_status: 'Paid',            
            order_status: 'Pending',
            po_num: 1001,            
        },
        {
            date: '5/10/2020',            
            vendor: 'Kath Ong - BeauteFinds',
            amount: 100000,            
            payment_status: 'Paid',            
            order_status: 'Pending',
            po_num: 1001,            
        },        
    ]  
    
    constructor(private tableSvc : TableService) {
        this.displayData = this.purchaseOrdersList
    }

    search(): void {
        const data = this.purchaseOrdersList
        this.displayData = this.tableSvc.search(this.searchInput, data )
    }

    statusChange(value: string): void {
        const data = this.purchaseOrdersList
        value !== 'All'? this.displayData = data.filter(elm => elm.order_status === value) : this.displayData = data
    }

    vendorChange(value: string): void {
        const data = this.purchaseOrdersList
        value !== 'All'? this.displayData = data.filter(elm => elm.vendor === value) : this.displayData = data
    }
}    