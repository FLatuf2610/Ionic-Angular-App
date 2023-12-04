import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId:string = 'abc';
  isLogged:boolean = true;

  logIn() :void {
    this.isLogged = true
    console.log(this.isLogged)
  }

  logOut() :void {
    this.isLogged = false
  }

  getUserId():string{
    return this.userId;
  }

  constructor() { }
}
