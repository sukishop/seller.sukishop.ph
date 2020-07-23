import { Routes } from '@angular/router';
import { ComponentsComponent } from '../../components/components.component'

export const CommonLayout_ROUTES: Routes = [

    //Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },

    //Products
    {
        path: 'products',
        loadChildren: () => import('../../products/products.module').then(m => m.ProductsModule),
    },

    //Expenses
    {
        path: 'expenses',
        loadChildren: () => import('../../expenses/expenses.module').then(m => m.ExpensesModule),
    },

    //Purchase Orders
    {
        path: 'purchase-orders',
        loadChildren: () => import('../../purchase_orders/purchase-orders.module').then(m => m.PurchaseOrdersModule),
    },

    //Orders
    {
        path: 'orders',
        loadChildren: () => import('../../orders/orders.module').then(m => m.OrdersModule),
    },

 
    //Apps
    {
        path: 'apps',
        data: {
            title: 'Apps'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }, 
            {
                path: '',
                loadChildren: () => import('../../apps/apps.module').then(m => m.AppsModule)
            },
        ]    
    },

    //Component
    {
        path: 'demo',
        component: ComponentsComponent,
        children: [
            {
                path: '',
                redirectTo: '/components/affix',
                pathMatch: 'full'
            }, 
            {
                path: '',
                loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
            }
        ],
        data: {
            title: 'Components '
        }
    },

    // Charts
    {
        path: 'charts',
        data: {
            title: 'Charts'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }, 
            {
                path: '',
                loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsModule)
            },
        ]    
    },

    //Pages
    {
        path: 'pages',
        data: {
            title: 'Pages '
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }, 
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
            },
        ]    
    }    
];