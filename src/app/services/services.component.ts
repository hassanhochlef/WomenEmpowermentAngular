import { Component, OnInit } from '@angular/core';
import {Service} from '../models/service.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ServicesService} from '../shared/services.service';
import {Appointment} from "../models/appointment.model";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
listServ: Service[] ;
  app: Appointment;
  submitted: boolean;
  eventDialog: boolean;
newAppointment = new Appointment();
  private routeSub: Subscription;
  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit(): void {
    this.routeSub = this.service.getServices().subscribe(res => {console.log(res); this.listServ = res; });
  }
  addService() {
    this.service.ajouterapp(this.newAppointment).subscribe(app => {
      console.log(app);
    });
    this.router.navigate(['service']).then(() => {
      window.location.reload();
    });
}
}
