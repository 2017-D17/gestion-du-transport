import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http
      .post<HttpResponse<any>>('http://localhost:8080/api/login', credentials, {
        observe: 'response'
      })
      .map(resp => {
        const token = resp.headers.get('Authorization');
        localStorage.setItem('access_token', token);
        return this.userRole;
      });
  }

  get userRole() {
    const token = localStorage.getItem('access_token');
    return this.jwt.decodeToken(token)['role'];
  }
}
