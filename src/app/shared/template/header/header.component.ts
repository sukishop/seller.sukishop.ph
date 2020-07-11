import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    searchVisible: boolean = false;
    quickViewVisible: boolean = false;
    isFolded: boolean;
    isExpand: boolean;

    constructor(private themeService: ThemeConstantService, private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        console.log('USER:');
        console.log(localStorage.getItem('user')); 
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }

    signOut() {
        this.authService.signOut();
    }

    notificationList = [
        {
            title: 'Order From Gail Arenas',
            time: '8 min',
            icon: 'shop',
            color: 'ant-avatar-' + 'blue'
        },
        {
            title: '0 Travel Set Stocks Remaining',
            time: '10 mins',
            icon: 'warning',
            color: 'ant-avatar-' + 'red'
        },
        {
            title: '1 Regular Set Stocks Remaining',
            time: '2 days',
            icon: 'alert',
            color: 'ant-avatar-' + 'gold'
        }
    ];
    
    get user(): any {
        return JSON.parse(localStorage.getItem('user'));
    }
 
}
