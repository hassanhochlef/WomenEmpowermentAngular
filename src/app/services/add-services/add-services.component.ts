import { Component, OnInit } from '@angular/core';
import {Service} from '../../models/service.model';
import {Router} from '@angular/router';
import {ServicesService} from '../../shared/services.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent implements OnInit {
newService = new Service();

  constructor(private router: Router , private servService: ServicesService) { }

  ngOnInit(): void {
  }
  addService() {
    this.servService.ajouterService(this.newService).subscribe(serv => {
      console.log(serv);
    });
    this.router.navigate(['service']).then(() => {
      window.location.reload();
    });

  }}


