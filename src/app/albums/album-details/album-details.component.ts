import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../shared/album.model';
import { AlbumService } from '../shared/album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  album!: Album;
  constructor (
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.albumService.getAlbumById(id).subscribe({
      next: album => {
        this.album = album;
      },
      error: error => {console.log('error :>> ', error);}
    });
  }
//   in albumService:
// getAlbumById(id: number): Observable < Album > {
//   return this.http.get<Album>(this.url + "/" + id);
// }

}
