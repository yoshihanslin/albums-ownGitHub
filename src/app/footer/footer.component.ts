import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input()
  title!:string;
  constructor () { }

  ngOnInit(): void {
    let dummy = 0;
  }
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

}
