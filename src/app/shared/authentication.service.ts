import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const API_URL = `${environment.BASE_URL}/api/authentication/`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any>{
    return this.http.post<any>(API_URL + 'sign-in', user).pipe(
        map(response => {
              if (response) {
                localStorage.setItem('currentUser', JSON.stringify(response));
                this.currentUserSubject.next(response);
              }
              return response;
            }
        )
    );
  }

  register(user: string, file: File): Observable<any> { //
    const data: FormData = new FormData();
    data.append('user', user);
    data.append('file', file);
    return this.http.post(API_URL + 'sign-up', data);
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }

  forgotPassword(email: string){
    let queryParams = {'email': email};
    return this.http.post(API_URL + 'reset-password', email, {params: queryParams});

  }

  updatePassword(password: string, token: string){
    let queryParams = {'token': token};
    return this.http.post(API_URL + 'reset-password/new', password, {params: queryParams});
  }

}
