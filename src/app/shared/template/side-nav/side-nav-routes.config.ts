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
        path: '/pages/invoice',
        title: 'Invoice',
        iconType: 'nzIcon',
        icon: 'file-text',
        iconTheme: '',
        submenu: []
    },
    {
        path: '/apps/e-commerce/orders-list',
        title: 'Orders',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'shopping',
        submenu: []
    },
    {
        path: '/charts/chartjs',
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
        path: '/demo/components/grid/en',
        title: 'Purchase Order',
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