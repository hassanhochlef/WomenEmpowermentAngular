import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Service} from '../models/service.model';
import {Appointment} from "../models/appointment.model";
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  servicesUrl = 'http://localhost:8087/SpringMVC/service/affichge'
  constructor(private http: HttpClient) { }
  getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(this.servicesUrl);
  }
  addcsUrl = 'http://localhost:8087/SpringMVC/service/addService';
  ajouterService( serv: Service): Observable<Service>{
    return this.http.post<Service>(this.addcsUrl, serv, httpOptions);
  }
  addapp = 'http://localhost:8087/SpringMVC/appointment/addrdv';
  ajouterapp( app: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(this.addapp, app, httpOptions);
  }
}
