/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

interface iUser {
  email?: string | null;
  password?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logginIn = new BehaviorSubject<boolean>(false);
  constructor( private http: HttpClient) { }
  
  async login(user: iUser){
    
    this.logginIn.next(true)
    try {
      const result = await this.http.post<any>(`${environment.api}/auth/signin`, user).toPromise();

      await new Promise(resolve => setTimeout(resolve, 3000));

      if (result && result.access_token) {
        window.localStorage.setItem('token', result.access_token);
        if (result.logo) {
          window.localStorage.setItem('avatar', result.logo.url.raw.url);
        }
        this.logginIn.next(false)
        return true;
      }
      this.logginIn.next(false)
        return false;
    } catch (error) {
      this.logginIn.next(false)
      return 
    }
  }

  getUser():string | null {
    return window.localStorage.getItem('avatar');
  }

  getTokenExpirationDate(token: string): Date | null{
    const decoded:any = jwt_decode(token)

    if(decoded.exp === undefined){
      return null
    }
    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)
    return date
  }

  isTokenExpired(token?: string): boolean {
    if(!token){
      return true
    }
    const date = this.getTokenExpirationDate(token)
    if(date === undefined){
      return false
    }
    return (date!.valueOf() > new Date().valueOf())
  }

  isUserLogged(){
    const token = window.localStorage.getItem('token')
    if (token){
      return true

    }else if (this.isTokenExpired(token!)){
      return false
    }

    return true
  }

  logout(){
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('avatar');
  }

} */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface iUser {
  email?: string | null;
  password?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class LoginServiceMock {
  logginIn = new BehaviorSubject<boolean>(false);

  // Usuário padrão
  defaultUser: iUser = {
    email: 'admin@user.com',
    password: 'password123',
  };

  async login(user: iUser = this.defaultUser) {
    this.logginIn.next(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      window.localStorage.setItem('token', 'mock_token');
      /* window.localStorage.setItem('avatar', 'mock_avatar_url'); */

      this.logginIn.next(false);
      return true;
    } catch (error) {
      this.logginIn.next(false);
      return;
    }
  }

  getUser(): string | null {
    return window.localStorage.getItem('avatar');
  }

  isUserLogged() {
    const token = window.localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('avatar');
  }
}
