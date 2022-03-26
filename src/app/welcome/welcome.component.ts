import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  excitementLevel: number = 5;
  constructor () { }

  ngOnInit(): void {
    let dummy = 0;
  }
  excite(changeAmount: number) {
    this.excitementLevel = this.excitementLevel + changeAmount;
  }


}
