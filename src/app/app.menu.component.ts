import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Main', icon: 'pi pi-home',
                items: [
                    {label: 'Admin Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin']},
                    {label: 'Front office', icon: 'pi pi-fw pi-directions', routerLink: ['/']}
                ]
            },
            {separator: true},
            {
                label: 'Sections', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'Courses', icon: 'pi pi-fw pi-id-card', routerLink: ['cour']},
                    {label: 'Forum', icon: 'pi pi-fw pi-comment', routerLink: ['forum']},
                    {label: 'Events', icon: 'pi pi-fw pi-star-o', routerLink: ['event']},
                    {label: 'Job Offers', icon: 'pi pi-fw pi-file', routerLink: ['offers']},
                    {label: 'Complaints', icon: 'pi pi-exclamation-circle', routerLink: ['complaints']},

                ]
            },
        ];
    }
}
