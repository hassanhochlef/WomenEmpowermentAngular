import { Injectable } from '@angular/core';
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StreamService extends  RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }
  createChannel(courseId: string){
    return this.http.post('http://localhost:8087/SpringMVC/api/ChannelStream/createcourseonline/' + courseId, null,
        {headers: this.getHeaders});
  }
  deleteChannel(courseId: string){
    return this.http.delete('http://localhost:8087/SpringMVC/api/ChannelStream/deleteStream/' + courseId,
        {headers: this.getHeaders});
  }
  getChannel(courseId: string){

  }
  startChannel(courseId: string){
    return this.http.post('http://localhost:8087/SpringMVC/api/ChannelStream/startStream/' + courseId, null,
        {headers: this.getHeaders});
  }
  endChannel(courseId: string){
    return this.http.post('http://localhost:8087/SpringMVC/api/ChannelStream/stopStream/' + courseId, null,
        {headers: this.getHeaders});
  }
}
