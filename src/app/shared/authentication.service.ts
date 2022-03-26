import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLoggedIn = false;

  redirectUrl = '';

  @Output() getLoggedInStatus: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router){
    this.isLoggedIn = (localStorage.getItem('loggedin')) ? true : false;

    console.log("In auth service constructor, isLoggedIn =",this.isLoggedIn)
  }

  login(email:string, password:string): boolean {

    if (email === 'test@test.com' && password === 'abcd1234') {
      this.getLoggedInStatus.emit(true);
        console.log('valid login');
          this.isLoggedIn = true;
          localStorage.setItem('loggedin', 'true');
          return true;
      } else {
      console.log('invalid login');
      this.getLoggedInStatus.emit(false);
          this.isLoggedIn = false;
          return false;
      }
  }

  logout(): void {
      this.isLoggedIn = false;
      this.getLoggedInStatus.emit(false);
      console.log('logging out user');
      localStorage.removeItem('loggedin');
      this.router.navigate(['./login']);
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

}
