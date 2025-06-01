import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register.model';
import { Observable, tap } from 'rxjs';
import { Login } from '../models/login.model';
import { LoginResponse } from '../interface/loginResponse';
import { CookieService } from 'ngx-cookie-service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: String = 'http://localhost:3000/api/users'; // Use of best practices with environment variables

  constructor(
    private httpClient: HttpClient,
    private cokkieService: CookieService
  ) {}

  signUp(register: Register): Observable<Register> {
    return this.httpClient.post<Register>(`${this.API_URL}/register`, register);
  }

  signIn(login: Login): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.API_URL}/login`, login)
      .pipe(
        tap((data: LoginResponse) => {
          this.setTokenCookie(data.token);
        })
      );
  }

  setTokenCookie(token: string) {
    this.cokkieService.set('token', token);
  }

  getTokenCookie() {
    return this.cokkieService.get('token');
  }

  deleteTokenCookie(){
    this.cokkieService.deleteAll();
  }

  getUserRole(): string {
    const token = this.getTokenCookie();
    if (!token) return '';
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
      console.log('Token payload:', payload); // 👀 Verifica que el payload tenga el rol correcto
      return payload.rol || ''; // 🔥 CAMBIA "role" POR "rol"
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }
  
  
}