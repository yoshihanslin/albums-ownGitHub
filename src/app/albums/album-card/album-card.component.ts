import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Album } from '../shared/album.model';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit, OnChanges {
  @Input()
  album!: Album;

  newPrice?: number;
  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if (this.album.isOnSale) {
      //Apply 10% discount
      this.newPrice = this.album.price - (this.album.price * .10);
    }
  }

}
