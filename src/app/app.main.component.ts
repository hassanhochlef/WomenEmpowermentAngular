import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from './app.menu.service';
import {PrimeNGConfig} from 'primeng/api';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
})
export class AppMainComponent implements OnInit, OnDestroy {

    myLinkElement: HTMLLinkElement;

    myLinkElement1: HTMLLinkElement;

    myLinkElement2: HTMLLinkElement;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    search = false;

    searchClick = false;

    userMenuClick: boolean;

    topbarUserMenuActive: boolean;

    notificationMenuClick: boolean;

    topbarNotificationMenuActive: boolean;

    rightMenuClick: boolean;

    rightMenuActive: boolean;

    configActive: boolean;

    configClick: boolean;

    resetMenu: boolean;

    menuHoverActive = false;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, public app: AppComponent) {
        this.myLinkElement1 = document.createElement('link');
        this.myLinkElement1.href = "assets/theme/blue/theme-light.css";
        this.myLinkElement1.rel = "stylesheet";
        this.myLinkElement1.id = "theme-css";
        //this.myLinkElement1.style = "text/css";

        this.myLinkElement2 = document.createElement('link');
        this.myLinkElement2.href = "assets/layout/css/layout-light.css";
        this.myLinkElement2.rel = "stylesheet";
        this.myLinkElement2.id = "layout-css";
        //this.myLinkElement2.style = "text/css";

        const myForm = document.getElementById('pagestyle');

        document.head.removeChild(myForm);


        document.head.appendChild(this.myLinkElement1);
        document.head.appendChild(this.myLinkElement2);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        document.head.removeChild(this.myLinkElement1);
        document.head.removeChild(this.myLinkElement2);
        this.myLinkElement = document.createElement('link');
        this.myLinkElement.href = "assets/css/material-kit-pro.min3294.css?v=3.0.1";
        this.myLinkElement.rel = "stylesheet";
        this.myLinkElement.id = "pagestyle";
        document.head.appendChild(this.myLinkElement);
    }

    onLayoutClick() {
        if (!this.searchClick) {
            this.search = false;
        }

        if (!this.userMenuClick) {
            this.topbarUserMenuActive = false;
        }

        if (!this.notificationMenuClick) {
            this.topbarNotificationMenuActive = false;
        }

        if (!this.rightMenuClick) {
            this.rightMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isSlim()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
            this.unblockBodyScroll();
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.searchClick = false;
        this.configClick = false;
        this.userMenuClick = false;
        this.rightMenuClick = false;
        this.notificationMenuClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarUserMenuActive = false;
        this.topbarNotificationMenuActive = false;
        this.rightMenuActive = false;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }

        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
            if (this.staticMenuMobileActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onSearchClick(event) {
        this.search = !this.search;
        this.searchClick = !this.searchClick;
    }

    onSearchHide(event) {
        this.search = false;
        this.searchClick = false;
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;
    }

    onTopbarUserMenuButtonClick(event) {
        this.userMenuClick = true;
        this.topbarUserMenuActive = !this.topbarUserMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarNotificationMenuButtonClick(event) {
        this.notificationMenuClick = true;
        this.topbarNotificationMenuActive = !this.topbarNotificationMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onRightMenuClick(event) {
        this.rightMenuClick = true;
        this.rightMenuActive = !this.rightMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isSlim() {
        return this.app.menuMode === 'slim';
    }

    isOverlay() {
        return this.app.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return window.innerWidth <= 991;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
}
