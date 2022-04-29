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

  getUser(userId: number): Observable<any> {
    const userUrl = `http://localhost:8087/SpringMVC/api/user/${userId}`;
    return this.http.get(userUrl, {headers: this.getHeaders});
  }

  getAllUser(): Observable<any> {
    return this.http.get(API_URL + 'all', {headers: this.getHeaders});
  }

  getMyPosts(): Observable<any>{
    return this.http.get(API_URL + 'myPosts', {headers: this.getHeaders});
  }

  followUser(username: string): Observable<any> {
    const userUrl = `http://localhost:8087/SpringMVC/api/user/friend/follow/${username}`;
    return this.http.post(userUrl, null, {headers: this.getHeaders});
  }

  unfollowUser(username: string): Observable<any> {
    const userUrl = `http://localhost:8087/SpringMVC/api/user/friend/unfollow/${username}`;
    return this.http.delete(userUrl, {headers: this.getHeaders});
  }

  getUserProfilPicture(): Observable<any> {
    return this.http.get(API_URL + 'picture', {headers: this.getHeaders, responseType: 'text'});
  }

  getUserProfilPicture2(userId: string): Observable<any> {
    let queryParams = {'userId': userId};
    return this.http.get(API_URL + 'picture2', {headers: this.getHeaders, params: queryParams, responseType: 'text'});
  }

  getAllFriends(): Observable<any> {
    return this.http.get(API_URL + 'friends', {headers: this.getHeaders});
  }

  getAllFriends2(userId: string): Observable<any> {
    let queryParams = {'userId': userId};
    return this.http.get(API_URL + 'friends2', {headers: this.getHeaders, params: queryParams});
  }

  getSuggestedFriends(): Observable<any> {
    return this.http.get(API_URL + 'suggestions', {headers: this.getHeaders});
  }

  getSuggestedFriends2(): Observable<any> {
    return this.http.get(API_URL + 'suggestions2', {headers: this.getHeaders});
  }

  getUsersInCommon(userId: string): Observable<any> {
    let queryParams = {'userId2': userId};
    return this.http.get(API_URL + 'common-friends', {headers: this.getHeaders, params: queryParams});
  }

  getNotifications(): Observable<any> {
    return this.http.get(API_URL + 'notifications', {headers: this.getHeaders});
  }

  markNotificationAsRead(notifId: number){
    return this.http.put(API_URL + 'notification/read', notifId, {headers: this.getHeaders});
  }

  markNotificationAsUnRead(notifId: number){
    return this.http.put(API_URL + 'notification/unread', notifId, {headers: this.getHeaders});
  }
}
