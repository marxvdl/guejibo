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

  private user: Partial<User>;

  setUser(user: Partial<User>) {
    this.user = user;
  }

  getUser(): Partial<User> {
    return this.user;
  }

  private topbar = null;

  private loggedIn: boolean = false;
  private token: string = null;  
  private currentUser: User = null;

  constructor(private http: HttpClient) { }

  /**
   * Register a new user in the system.
   */
  public register(name: string, email: string, password: string): Observable<Response> {
    return <Observable<Response>>this.http.post(
      environment.apiUrl + 'auth/register',
      {
        name: name,
        email: email,
        password: password
      }
    );
  }

  /**
   * Returns the http headers needed to connect to the server with the
   * JWT authentication.
   */
  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
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
   * Reads the stored cookie to recover who is logged in, if necessary.
   */
  private recoverUserDataFromCookie() {
    if(this.loggedIn)
      return;

    const jwt = Cookies.get('jwt');
    if(jwt === undefined)
      return;

    this.loggedIn = true;
    this.token = jwt;
    this.decodeAuthToken();
  }

  /**
   * Returns whether the user is currently logged in in the system.
   */
  public isLoggedIn(): boolean {
    this.recoverUserDataFromCookie();
    return this.loggedIn;
  }

  /**
   * Returns the current JWT token.
   */
  public getToken(): string {
    this.recoverUserDataFromCookie();
    return this.token;
  }

  /**
   * Gets data about the currently logged in user.
   */
  public getLoggedInUser(): User {
    this.recoverUserDataFromCookie();
    
    if(!this.isLoggedIn())
      return null;
      
    return this.currentUser;
  }

  /**
   * Updates the value of loggedInUser according to the current token.
   */
  private decodeAuthToken(): void {
    const decodedJwt = jwtDecode(this.token);
    this.currentUser = {
      id: decodedJwt.id,
      name: decodedJwt.name,
      email: decodedJwt.email
    };
  }

  /**
   * Uses a JWT token to set up the current user.
   * @param token The JWT token.
   */
  public setupUserWithToken(token: string) {
    this.loggedIn = true;
    this.token = token;
    Cookies.set('jwt', token, { path: '/' });
    this.decodeAuthToken();

    this.updateTopbar();
  }

  /**
   * Logs into the system with email and password.
   * @param email 
   * @param password 
   */
  public login(email: string, password: string): Observable<Response> {
    let response$ = <Observable<Response>>this.http.post(
      environment.apiUrl + 'auth/login',
      {
        email: email,
        password: password
      }
    );

    response$.pipe(
      tap(response => {
        if(response.success === true){
          this.loggedIn = true;
          this.decodeAuthToken();
          this.token = response['token'];          
          Cookies.set('jwt', response['token'], { path: '/' });

          this.updateTopbar();
        }
      })
    );

    return response$;    
  }

  /**
   * Logs out of the system.
   */
  public logout() {
    this.loggedIn = false;
    this.currentUser = null;
    this.token = null;
    Cookies.remove('jwt');

    this.updateTopbar();
  }

}
