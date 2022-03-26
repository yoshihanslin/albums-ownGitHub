import { Component, OnInit } from "@angular/core";
import { Album } from "../shared/album.model";
import { AlbumService } from "../shared/album.service";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albumsArray: Album[] = [];

  constructor (private albumService: AlbumService) { };

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums()
      .subscribe({
        next: (albums: Album[]) => { this.albumsArray = albums },
        error: error => {console.log("Error: ", error)}
      }
      );
  }
  // this.albumService:
  // url = "http://localhost:3334/albums";
  // getAlbums(): Observable<Album[]> {
  //   return this.http.get<Album[]>(this.url);
  // }
  // package.json: start a server, data from the music-info.json
  // "start-db": "json-server --watch data/music-info.json --port 3334",
}


