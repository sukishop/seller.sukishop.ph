import { Component } from '@angular/core';
import { TableService } from '../shared/services/table.service';

interface DataItem {
    date: string;
    vendor: string;
    amount: number;    
    status:  string;
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
            title: 'Date',
            compare: (a: DataItem, b: DataItem) => a.date.localeCompare(b.date)
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
            title: 'Status',
            compare: (a: DataItem, b: DataItem) => a.status.localeCompare(b.status)
        },
        {
            title: ''
        }
    ]

    purchaseOrdersList = [
        {
            date: '06/20/2020',            
            vendor: 'Katherine Ong - BeauteFinds',
            amount: 100000,            
            status: 'in-progress',            
        },
        {
            date: '06/10/2020',            
            vendor: 'Beautederm - Head Office',
            amount: 100000,            
            status: 'delivered',            
        },
        {
            date: '06/01/2020',            
            vendor: 'Beautederm - Head Office',
            amount: 100000,            
            status: 'delivered',            
        },
        {
            date: '05/28/2020',            
            vendor: 'Beautederm Head Office',
            amount: 100000,            
            status: 'delivered',            
        },
        {
            date: '05/20/2020',            
            vendor: 'Beautederm Head Office',
            amount: 100000,            
            status: 'delivered',            
        },
        {
            date: '5/10/2020',            
            vendor: 'Katherine Ong - BeauteFinds',
            amount: 100000,            
            status: 'delivered',            
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
        value !== 'All'? this.displayData = data.filter(elm => elm.status === value) : this.displayData = data
    }

    vendorChange(value: string): void {
        const data = this.purchaseOrdersList
        value !== 'All'? this.displayData = data.filter(elm => elm.vendor === value) : this.displayData = data
    }
}    