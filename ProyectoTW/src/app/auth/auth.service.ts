import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register.model';
import { Observable, tap } from 'rxjs';
import { Login } from '../models/login.model';
import { LoginResponse } from '../interface/loginResponse';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: String = 'http://localhost:3000/api/users'; // Use of best practices with environment variables

  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();
  constructor(
    private httpClient: HttpClient,
    private cokkieService: CookieService
  ) {this.setUserRoleFromToken();}

  signUp(register: Register): Observable<Register> {
    return this.httpClient.post<Register>(`${this.API_URL}/register`, register);
  }

  signIn(login: Login): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.API_URL}/login`, login)
      .pipe(
        tap((data: LoginResponse) => {
          this.setTokenCookie(data.token);
          this.setUserRoleFromToken();
        })
      );
  }

 setUserRoleFromToken() {
  const token = this.getTokenCookie();
  if (!token) {
    this.userRoleSubject.next('');
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.userRoleSubject.next(payload.rol || '');
  } catch (error) {
    console.error('Error decoding token:', error);
    this.userRoleSubject.next('');
  }
}



  setTokenCookie(token: string) {
    this.cokkieService.set('token', token);
  }

  getTokenCookie() {
    return this.cokkieService.get('token');
  }

  deleteTokenCookie(){
    this.cokkieService.deleteAll();
    this.clearUserRole();
  }
 clearUserRole() {
    this.userRoleSubject.next('');
  }
  getUserRole(): string {
    const token = this.getTokenCookie();
    if (!token) return '';
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
     
      return payload.rol || ''; // 🔥 CAMBIA "role" POR "rol"
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }
}