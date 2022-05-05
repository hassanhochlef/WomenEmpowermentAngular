import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Donation} from "../models/donation.model";
import {Event} from "../models/event.model";
import {AuthenticationService} from "./authentication.service";
import {RequestBaseService} from "./request-base.service";

@Injectable({
  providedIn: 'root'
})
export class DonationService extends  RequestBaseService {
  private baseUrl = `http://localhost:8087/SpringMVC/Donation/Get-all-Donation`;
  constructor(private httpClient: HttpClient, authenticationService: AuthenticationService) {
    super(authenticationService, httpClient);
  }


  getDonationList(): Observable<Donation[]>{
    return this.httpClient.get<Donation[]>('http://localhost:8087/SpringMVC/Donation/Get-all-Donation');
  }
  donationEvent(idEvent: string, donation: Donation ){
    return this.httpClient.post<Event>(`http://localhost:8087/SpringMVC/Donation/add-Donation-Event/${idEvent}`, donation, {headers: this.getHeaders});
  }

}
