import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

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
  private loggedInUser: User = null;

  constructor(private http: HttpClient) { }

  /**
   * Register a new user in the system.
   */
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

  /**
   * Calls the back end API that returns data about the currently logged in user.
   */
  private getLoggedInUserFromBackend(): Observable<User> {
    if (AuthService.token === null)
      return null;

    let user$ = <Observable<User>>this.http.get(
      environment.apiUrl + 'auth/profile',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + AuthService.token
        })
      }
    );

    user$.pipe(
      tap(user => { this.loggedInUser = user })
    );

    return user$;
  }

  /**
   * Gets data about the currently logged in user.
   * Tries to fetch locally stored info first, only calls the API if necessary.
   */
  public getLoggedInUser(): Observable<User> {
    if (this.loggedInUser !== null) {
      return of(this.loggedInUser);
    }
    else {
      return this.getLoggedInUserFromBackend();
    }
  }

  /**
   * Initializes a reference to the Topbar component.
   * @param component The Topbar component.
   */
  public initTopbarReference(component): void {
    this.topbar = component;
  }

  /**
   * Updates logged user info in the Topbar component.
   */
  public updateTopbar() {
    this.topbar.updateLoggedInStatus();
  }

  /**
   * Returns wheter the user is currently logged in in the system.
   */
  public isLoggedIn(): boolean {
    if (AuthService.token === null) {
      const cookieJwt = Cookies.get('jwt');
      if (cookieJwt === undefined) {
        return false;
      }
      else {
        AuthService.token = cookieJwt;
        return true;
      }
    }
    else {
      return true;
    }
  }

  /**
   * Log in into the system.
   * @param token The JWT token.
   */
  public logIn(token) {
    const user = jwtDecode(token);
    this.loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    AuthService.token = token;
    Cookies.set('jwt', token, { path: '/' });    

    this.updateTopbar();
  }

  /**
   * Logs out of the system.
   */
  public logOut() {
    this.loggedInUser = null;
    AuthService.token = null;
    Cookies.remove('jwt');

    this.updateTopbar();
  }

}
