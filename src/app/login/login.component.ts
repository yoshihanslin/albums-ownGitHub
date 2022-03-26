import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Output } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../shared/validation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  emailPattern = ".+@.+\..+";

  isValidFormSubmitted: boolean = false;

  constructor (private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  private subscription = new Subscription();

  ngOnInit() {
    this.buildForm();
    //trigger evaluation again after x seconds due to autofills
    setTimeout(() => { this.triggerClick }, 100);
  }

  // this code will get access to the field and 
  @ViewChild('emailfield') emailfield!: ElementRef<HTMLElement>;

  triggerClick() {
    console.log("click to trigger validation")
    let el: HTMLElement = this.emailfield.nativeElement;
    el.click();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, ValidationService.passwordValidator]]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }


  submit() {
    console.log('emailfield.nativeElement :>> ', this.emailfield.nativeElement);
    this.isValidFormSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));

    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    // Using test@test.com and abcd1234 should take you to the Welcome page.

    if (this.authService.login(email, password)) {
      console.log('back from successful login')
      if (!this.authService.redirectUrl) {
        this.authService.redirectUrl = '/welcome';
      }
      this.router.navigateByUrl(this.authService.redirectUrl);

    }
    else {
      console.log('back from unsuccessful login')
      alert('Invalid login try again')
    }



  }


  logout() {
    this.authService.logout();
    this.authService.redirectUrl = '/login';
  }



}
