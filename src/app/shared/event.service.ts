import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from 'src/app/models/event.model';
import {RequestBaseService} from './request-base.service';
import {AuthenticationService} from './authentication.service';
import {Course} from "../models/course.model";


@Injectable({
    providedIn: 'root'
})
export class EventService extends  RequestBaseService{
    private baseUrl = `http://localhost:8087/SpringMVC/Event/Get-all-Event`;
    constructor(private httpClient: HttpClient, authenticationService: AuthenticationService) {
        super(authenticationService, httpClient);

    }


    getEventList(): Observable<Event[]>{
        return this.httpClient.get<Event[]>('http://localhost:8087/SpringMVC/Event/Get-all-Event', {headers: this.getHeaders});
    }
    createEvent2(event: Event){
        return this.httpClient.post<Event>(`http://localhost:8087/SpringMVC/Event/create-event`, event, {headers: this.getHeaders});
    }
    deletEvent(id: number): Observable<any> {
        return this.httpClient.delete(`http://localhost:8087/SpringMVC/Event/removeEvent/${id}`, { responseType: 'text' });
    }
    getStatistic(): Observable<Event[]>{
        return this.httpClient.get<Event[]>('http://localhost:8087/SpringMVC/Event/findEventYear');
    }
    public uploadImage(imagen: File , id: string): Observable<any> {
        const formData = new FormData();
        formData.append('multipartFile', imagen);
        return this.httpClient.post<any>('http://localhost:8087/SpringMVC/Event/upload/' + '1', formData);
    }



    getEventById(id: number): Observable<Event>{
        return this.http.get<Event>(`http://localhost:8087/SpringMVC/Event/getEvent/${id}`);
    }



}
