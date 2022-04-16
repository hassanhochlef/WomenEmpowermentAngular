import { Component, OnInit } from '@angular/core';
import {Service} from '../models/service.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ServicesService} from '../shared/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
listServ: Service[] ;
  private routeSub: Subscription;
  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit(): void {
    this.routeSub = this.service.getServices().subscribe(res => {console.log(res); this.listServ = res; });
  }

}
