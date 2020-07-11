import { SideNavInterface } from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: []
    },   
    {
        path: '/orders',
        title: 'Orders',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'shopping',
        submenu: []
    },
    {
        path: '/expenses',
        title: 'Expenses',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'wallet',
        submenu: []
    },
    {
        path: '/products',
        title: 'Products',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'shop',
        submenu: []
    },
    {
        path: '/purchase-orders',
        title: 'Purchase Orders',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'shopping-cart',
        submenu: []
    },
    {
        path: '/pages/profile',
        title: 'Settings',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'setting',
        submenu: []
    }
]    