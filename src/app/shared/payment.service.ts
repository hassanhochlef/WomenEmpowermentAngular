import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PaymentModel } from '../models/payment.model';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  stripeURL = '';
  constructor(private httpClient: HttpClient) { }
  public confirmer(id: string): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8087/SpringMVC/Donation/add-Donation-Event/${id}', {}, cabecera);
  }


  public GenererToken(paymentIntentDto: PaymentModel): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8087/SpringMVC/Donation/paymentintent', paymentIntentDto, cabecera);
  }


}
