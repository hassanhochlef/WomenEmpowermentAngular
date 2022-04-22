import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Product } from 'src/app/demo/domain/product';
import { Event } from 'src/app/models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private baseUrl = `http://localhost:8087/SpringMVC/Event/findEventYear`;
    constructor(private httpClient: HttpClient) { }


    getEventList(): Observable<Event[]>{
        return this.httpClient.get<Event[]>('http://localhost:8087/SpringMVC/Event/Get-all-Event');
    }

    createEvent(event: Event): Observable<Event>{
        return this.httpClient.post(`http://localhost:8087/SpringMVC/Event/createEvenement`, event);
    }
    deletEvent(id: number): Observable<any> {
        return this.httpClient.delete(`http://localhost:8087/SpringMVC/Event/removeEvent/${id}`, { responseType: 'text' });
    }
    updateEmployee(id: number, value: any): Observable<Event> {
        return this.httpClient.put(`http://localhost:8087/SpringMVC/Event/editEventCreatedByUser/${id}`, value);
    }
    addUserEvent(userid: number): Observable<any> {
        return this.httpClient.post(`http://localhost:8087/SpringMVC/Event/create-event/${userid}`, { responseType: 'text' });
    }
    getStatistic(): Observable<Event[]>{
        return this.httpClient.get<Event[]>('http://localhost:8087/SpringMVC/Event/findEventYear');
    }

}
