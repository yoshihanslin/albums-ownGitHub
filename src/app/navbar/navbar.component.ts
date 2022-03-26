import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  title: string = "";
  isLoggedIn: boolean = false;
  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getLoggedInStatus.subscribe(status => this.isLoggedIn= status);
  }

  logout(): void{
    this.isLoggedIn = false;
    this.authService.logout();
  }

}
