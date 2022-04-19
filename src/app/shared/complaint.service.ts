import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Complaint} from '../models/complaint.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  complaintsUrl = 'http://localhost:8087/SpringMVC/complaint/affichReclamation';
  constructor(private http: HttpClient) { }
  getComplaints(): Observable<Complaint[]>{
    return this.http.get<Complaint[]>(this.complaintsUrl);
  }
  addcUrl = 'http://localhost:8087/SpringMVC/complaint/addReclamation';
  ajouterComplaint( comp: Complaint): Observable<Complaint>{
    return this.http.post<Complaint>(this.addcUrl, comp, httpOptions);
  }
deletcUrl = 'http://localhost:8087/SpringMVC/complaint/delet/';
  supprimerProduit(complaintId : number) {
    const url = '${this.deletcUrl}/${complaintId}';
    return this.http.delete(url, httpOptions);
  }
  consulturl = 'http://localhost:8087/SpringMVC/complaint';
  consulterComp(complaintId: number): Observable<Complaint> {
    const url = `${this.consulturl}/${complaintId}`;
    return this.http.get<Complaint>(url);
  }
  updateProduit(comp: Complaint): Observable<Complaint>
  {
    return this.http.put<Complaint>(this.consulturl, comp, httpOptions);
  }

  DeletePost(complaintId: string) {
    return this.http.delete<Complaint>('http://localhost:8087/SpringMVC/complaint/delet/' + complaintId);

  }
    deleteComplaintById(complaintId: number) {
    return this.http.delete('http://localhost:8087/SpringMVC/complaint/delet/'+complaintId);
  }
}
