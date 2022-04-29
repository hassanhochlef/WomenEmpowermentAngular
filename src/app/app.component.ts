import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AuthenticationService} from './shared/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    menuMode = 'static';

    colorScheme = 'light';

    menuTheme = 'layout-sidebar-darkgray';

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig, private authenticationService: AuthenticationService, private router: Router) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
