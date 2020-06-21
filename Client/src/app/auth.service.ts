import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface User {
  id: number,
  name: string,
  email?: string
}

export interface Response {
  success: boolean
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static token: string = null;

  constructor(private http: HttpClient) { }

  public register(name: string, email: string, password: string): Observable<Response> {
    let response$ = <Observable<Response>>this.http.post(
      environment.apiUrl + 'auth/register',
      {
        name: name,
        email: email,
        password: password
      }
    );

    return response$.pipe(
      tap(response => {
        if (response.success === true) {
          AuthService.token = response['token'];
        }
      })
    );
  }

  public getProfile(): Observable<User> {
    if (AuthService.token === null)
      return null;

      console.log('vamuveee');

    return <Observable<User>>this.http.get(
      environment.apiUrl + 'auth/profile',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + AuthService.token
        })
      }
    );
  }
}
