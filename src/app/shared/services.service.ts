import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Service} from '../models/service.model';
import {Appointment} from "../models/appointment.model";
import {Complaint} from "../models/complaint.model";
import {Post} from "../models/post.model";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class ServicesService extends  RequestBaseService{
  servicesUrl = 'http://localhost:8087/SpringMVC/service/affichge'
  constructor( http: HttpClient, authenticationService: AuthenticationService) {
    super(authenticationService, http);
  }
  getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(this.servicesUrl,{headers: this.getHeaders});
  }
  /*addcsUrl = 'http://localhost:8087/SpringMVC/service/addService';
  ajouterService( serv: Service): Observable<Service>{
    return this.http.post<Service>(this.addcsUrl, serv, httpOptions);
  }*/
  ajouterService(serv: Service) {
    return this.http.post<Service>('http://localhost:8087/SpringMVC/service/addService/1', serv, {headers: this.getHeaders});
  }
  addapp = 'http://localhost:8087/SpringMVC/appointment/addrdv';
  ajouterapp( app: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(this.addapp, app, httpOptions);
  }
  DeleteServ(serviceId: string) {
    return this.http.delete<Service>('http://localhost:8087/SpringMVC/service/delete/' + serviceId,{headers: this.getHeaders});

  }

  reserve(exid: string, serviceId: string , a: Appointment ) {
    return this.http.post<Appointment>('http://localhost:8087/SpringMVC/appointment/addrdv/' + serviceId + '/1/'  + exid , a, {headers: this.getHeaders});

  }
}
