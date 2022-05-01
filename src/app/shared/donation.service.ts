import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Donation} from "../models/donation.model";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl = `http://localhost:8087/SpringMVC/Donation/Get-all-Donation`;
  constructor(private httpClient: HttpClient) { }


  getDonationList(): Observable<Donation[]>{
    return this.httpClient.get<Donation[]>('http://localhost:8087/SpringMVC/Donation/Get-all-Donation');
  }
  getDonationv2() {
    return this.httpClient.get<any>('http://localhost:8087/SpringMVC/Donation/Get-all-Donation')
        .toPromise()
        .then(res => res.data as Donation[])
        .then(data => data);
  }

}
