import { Injectable } from '@angular/core';
import {RequestBaseService} from './request-base.service';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Notification} from '../models/natification.model';
import {User} from '../models/user.model';

const API_URL = `${environment.BASE_URL}/api/user/`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends  RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  editProfil(user: User): Observable<any> {
    return this.http.put(API_URL + 'update', user, {headers: this.getHeaders});
  }

  getAllFriends(): Observable<any> {
    return this.http.get(API_URL + 'friends', {headers: this.getHeaders});
  }

  getNotifications(): Observable<any> {
    return this.http.get(API_URL + 'notifications', {headers: this.getHeaders});
  }

  markNotificationAsRead(notifId: number){
    return this.http.put(API_URL + 'notification/read', notifId, {headers: this.getHeaders});
  }
}
