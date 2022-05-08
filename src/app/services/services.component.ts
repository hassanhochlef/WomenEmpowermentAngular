import { Component, OnInit } from '@angular/core';
import {Service} from '../models/service.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ServicesService} from '../shared/services.service';
import {Appointment} from "../models/appointment.model";
import { job} from "../models/job.enum";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
listServ: Service[] ;
a: Appointment = new Appointment();
  ser: Service = new Service();

  Job: job[] = [];
  app: Appointment;
  submitted: boolean;
  eventDialog: boolean;
newAppointment = new Appointment();
  private routeSub: Subscription;
  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit(): void {
    this.Job = [job.AccountingExpert, job.Doctor, job.Attorney, job.Psychologist];
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
  deletePost(id: string) {
    this.service.DeleteServ(id).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['/Service']).then(() => {
      window.location.reload();
    });


  }

  resrv() {
    this.service.reserve('1', this.ser.serviceId.toString() , this.a).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['/Service']).then(() => {
      window.location.reload();
    });


  }
  openad(ser1: Service){
    this.ser = ser1 ;
  }

}
