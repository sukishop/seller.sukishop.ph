import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrdersRoutingModule } from './purchase-orders-routing.module';
import { QuillModule } from 'ngx-quill';

import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { AppsService } from '../shared/services/apps.service';
import { TableService } from '../shared/services/table.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { PurchaseOrdersListComponent } from './purchase-orders-list.component';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderViewComponent } from './purchase-order-view.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { InputVendorDropdownMenuComponent } from './includes/input-vendor';
import { InputProductDropdownMenuComponent } from './includes/input-product';

const antdModule = [
    NzButtonModule,
    NzCardModule,
    NzAvatarModule, 
    NzRateModule,
    NzBadgeModule,
    NzProgressModule,
    NzRadioModule,
    NzTableModule,
    NzDropDownModule,
    NzTimelineModule,
    NzTabsModule,
    NzTagModule,
    NzListModule,
    NzCalendarModule,
    NzToolTipModule,
    NzFormModule,
    NzModalModule,
    NzSelectModule,
    NzUploadModule,
    NzInputModule,
    NzPaginationModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzMessageModule,
    NzDividerModule, 
    NzInputNumberModule
]

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        PurchaseOrdersRoutingModule,
        QuillModule,
        ...antdModule
    ],
    declarations: [        
        PurchaseOrdersListComponent,
        PurchaseOrderComponent,
        PurchaseOrderViewComponent,
        InputVendorDropdownMenuComponent,
        InputProductDropdownMenuComponent        
    ],
    providers: [
        ThemeConstantService,
        AppsService,
        TableService
    ]
})

export class PurchaseOrdersModule {}