import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from 'src/app/models/event.model';
import {RequestBaseService} from './request-base.service';
import {AuthenticationService} from './authentication.service';
import {Course} from "../models/course.model";
import {PostComment} from "../models/postComment.model";
import {EventcommentModel} from "../models/eventcomment.model";
import { EventFile} from "../models/eventFile";

@Injectable({
    providedIn: 'root'
})
export class EventService extends  RequestBaseService{
    private baseUrl = `http://localhost:8087/SpringMVC/Event/Get-all-Event`;
    constructor(private httpClient: HttpClient, authenticationService: AuthenticationService) {
        super(authenticationService, httpClient);

    }

    GETbESTdONOR(): Observable<any[]>{
        return this.httpClient.get<any[]>('http://localhost:8087/SpringMVC/Donation/bestDoner', {headers: this.getHeaders});
    }
    getEventList(): Observable<Event[]>{
        return this.httpClient.get<Event[]>('http://localhost:8087/SpringMVC/Event/Get-all-Event', {headers: this.getHeaders});
    }
    createEvent2(event: Event){
        return this.httpClient.post<Event>(`http://localhost:8087/SpringMVC/Event/create-event`, event, {headers: this.getHeaders});
    }
    deletEvent(id: number): Observable<any> {
        return this.http.delete('http://localhost:8087/SpringMVC/Event/remouveEvent/' + id, {headers: this.getHeaders} );
    }
    getStatistic(): Observable<Event[]>{
        return this.httpClient.get<Event[]>('http://localhost:8087/SpringMVC/Event/findEventYear');
    }
    getEventById(id: number): Observable<Event>{
        return this.http.get<Event>(`http://localhost:8087/SpringMVC/Event/getEvent/${id}`, {headers: this.getHeaders});
    }
    cancelParticipation(id: string): Observable<any> {
        return this.http.delete('http://localhost:8087/SpringMVC/Event/cancelParticipation/' + id, {headers: this.getHeaders} );
    }

    joindEvent(idEvent: string){
        return this.http.post('http://localhost:8087/SpringMVC/Event/userparticipe-event/' + idEvent, null, {headers: this.getHeaders});
    }



    addCommentPst(IdCom: string, eventcomm: EventcommentModel) {
         return this.http.post<Comment>('http://localhost:8087/SpringMVC/Event/add-Commentevent/' + IdCom + '/1'  , eventcomm, {headers: this.getHeaders});
    }


    postFile(idEvent: number, file: File) {
        const formParams = new FormData();
        // @ts-ignore
        formParams.append('file', file);
        const options: { headers: HttpHeaders } = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data'
            })
        };
        return this.http.post('http://localhost:8087/SpringMVC/file/upload/' + idEvent, formParams);
    }


    //backoffice
    getListBackallEvent(): Observable<Event[]>{
        return this.httpClient.get<Event[]>('http://localhost:8087/SpringMVC/Event/Get-all-Event', {headers: this.getHeaders});
    }
    GetBestDonorOfEvent(): Observable<any[]>{
        return this.httpClient.get<any[]>('http://localhost:8087/SpringMVC/Donation/bestDoner');
    }

    getAdressByMAP(id: number): Observable<any>{
        return this.http.get<any>(`http://localhost:8087/SpringMVC/Event/googleMapAdress/${id}`);
    }
    getEventFile(): Observable<EventFile[]> {
        return this.http.get<EventFile[]>('http://localhost:8087/SpringMVC/file/files');
    }
    /*updateEvent(idEvent: number, event: Event) {
        return this.http.put<Event>('http://localhost:8087/SpringMVC/Event/editEvent/' + idEvent, event, {headers: this.getHeaders});
    }*/


    updateEvent(idEvent: string , event: Event) {
        return this.http.put<Event>('http://localhost:8087/SpringMVC/Event/editEvent/' + idEvent + '/' , event , {headers: this.getHeaders});

    }


    getListCommentEvent(): Observable<EventcommentModel[]>{
        return this.httpClient.get<EventcommentModel[]>('http://localhost:8087/SpringMVC/Event/getEventComment', {headers: this.getHeaders});
    }



    // uploadfileEvent(idEvent: number, file: File) {
    //     const formParams = new FormData();
    //     // @ts-ignore
    //
    //     return this.http.post('http://localhost:8087/SpringMVC/Event/IMAGEEVENT/' + idEvent, formParams, {headers: this.getHeaders});
    // }



}
