import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  private topbar;
  
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

    return response$;
  }

  public getProfile(): Observable<User> {
    if (AuthService.token === null)
      return null;

    return <Observable<User>>this.http.get(
      environment.apiUrl + 'auth/profile',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + AuthService.token
        })
      }
    );
  }  

  public initTopbarReference(component):void {
    this.topbar = component;
  }

  public updateTopbar(){
    this.topbar.updateLoggedInStatus();
  }

}
