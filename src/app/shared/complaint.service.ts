import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Complaint} from '../models/complaint.model';
import {AuthenticationService} from "./authentication.service";
import {RequestBaseService} from "./request-base.service";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class ComplaintService extends  RequestBaseService{

  constructor( http: HttpClient, authenticationService: AuthenticationService) {
    super(authenticationService, http);
  }
  getComplaints(): Observable<Complaint[]>{
    return this.http.get<Complaint[]>('http://localhost:8087/SpringMVC/complaint/affichReclamation',{headers: this.getHeaders});
  }
 // addcUrl = 'http://localhost:8087/SpringMVC/complaint/addReclamation';
  ajouterComplaint( comp: Complaint){
    return this.http.post<Complaint>('http://localhost:8087/SpringMVC/complaint/addReclamation/1', comp, {headers: this.getHeaders});
  }


  consulturl = 'http://localhost:8087/SpringMVC/complaint';
  consulterComp(complaintId: number): Observable<Complaint> {
    const url = `${this.consulturl}/${complaintId}`;
    return this.http.get<Complaint>(url);
  }

  UpdateComp(idCom: string , c: Complaint) {
    return this.http.put<Complaint>('http://localhost:8087/SpringMVC/complaint/update/' + idCom + '/' , c , {headers: this.getHeaders});

  }

  DeletePost(complaintId: string) {
    return this.http.delete<Complaint>('http://localhost:8087/SpringMVC/complaint/delet/' + complaintId , {headers: this.getHeaders});

  }

}
