import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../shared/album.service';
import { Album } from './../shared/album.model';
import { CanComponentDeactivate } from './../../guards/can-deactivate.guard';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit, CanComponentDeactivate {

  album!: Album;
  submitBtnPressed= false;

  constructor (private route: ActivatedRoute,
    private service: AlbumService,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.route
      .queryParamMap
      .pipe(map(params => 
      //   console.log('params :>> ', params);
        params.get('albumToEdit')
      ))
      .subscribe((albumData) => {
        if (albumData) {
          console.log('albumData :>> ', albumData);
          this.album = JSON.parse(albumData);
        }
      })

  }

  editAlbum(form: NgForm) {
    this.submitBtnPressed = true;
    console.log('in edit album calling service');
    let subscription = this.service.updateAlbum(this.album).subscribe(
      () => this.router.navigate(['./albums']),
    )
  }

  canDeactivate(): Observable<boolean> | boolean {

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    console.log("in album-edit canDeactivate()");
    let msg="";
    if (this.submitBtnPressed==true) msg="Changes Made!";
    else msg= "Discard Changes?";
    this.submitBtnPressed=false;
    return this.dialogService.confirm(msg);
  }

}

// updateAlbum(album: Album): Observable<Album> {
//   console.log('in update service', album)
//   let newUrl = `${this.url}/${album.id}`;
//   console.log('newUrl', newUrl)
//   return this.http.put<Album>(newUrl, album)
//     .pipe(
//       catchError(this.handleError('update', album))
//     );
// }

// albumData:
// albumData:>> {
//   "id": 5,
//   "artist": "Grateful Dead",
//   "albumName": "Aoxomoxoa",
//   "isOnSale": 1,
//   "price": 16.24,
//   "year": 1969,
//   "releaseDate": "June 20, 1969",
//   "recordingLocation": "Alembic Studios, San Francisco, CA",
//   "genre": "Pop/Rock",
//   "duration": "38:07:00",
//   "url": "https://www.allmusic.com/album/aoxomoxoa-mw0000650206",
//   "tracks": [
//     {
//       "id": 5,
//       "trackNumber": 1,
//       "title": "St. Stephen",
//       "length": "4:25"
//     },
//     {
//       "id": 5,
//       "trackNumber": 2,
//       "title": "Dupree's Diamond Blues",
//       "length": "3:40"
//     },
//     {
//       "id": 5,
//       "trackNumber": 3,
//       "title": "Rosemary",
//       "length": "2:02"
//     },
//     {
//       "id": 5,
//       "trackNumber": 4,
//       "title": "Doin' That Rag",
//       "length": "5:15"
//     },
//     {
//       "id": 5,
//       "trackNumber": 5,
//       "title": "Mountains of the Moon",
//       "length": "4:15"
//     },
//     {
//       "id": 5,
//       "trackNumber": 6,
//       "title": "China Cat Sunflower",
//       "length": "4:15"
//     },
//     {
//       "id": 5,
//       "trackNumber": 7,
//       "title": "What's Become of the Baby",
//       "length": "8:30"
//     },
//     {
//       "id": 5,
//       "trackNumber": 8,
//       "title": "Cosmic Charlie",
//       "length": "5:45"
//     }
//   ]
// }

// params:
// albumToEdit: "{\n  \"id\": 3,\n  \"artist\": \"The Beatles\",\n  \"albumName\": \"The White Album\",\n  \"isOnSale\": 1,\n  \"price\": 12,\n  \"year\": 1968,\n  \"releaseDate\": \"November 22, 1968\",\n  \"recordingLocation\": \"\",\n  \"genre\": \"Pop/Rock\",\n  \"duration\": \"1:33:43\",\n  \"url\": \"https://www.allmusic.com/album/the-beatles-white-album-mw0000418113\",\n  \"tracks\": [\n    {\n      \"id\": 3,\n      \"trackNumber\": 1,\n      \"title\": \"Back in the U.S.S.R.\",\n      \"length\": \"2:43\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 2,\n      \"title\": \"Dear Prudence\",\n      \"length\": \"3:55\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 3,\n      \"title\": \"Glass Onion\",\n      \"length\": \"2:18\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 4,\n      \"title\": \"Ob-La-Di, Ob-La-Da\",\n      \"length\": \"3:09\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 5,\n      \"title\": \"Wild Honey Pie\",\n      \"length\": \"0:53\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 6,\n      \"title\": \"The Continuing Story of Bungalow Bill\",\n      \"length\": \"3:14\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 7,\n      \"title\": \"While My Guitar Gently Weeps\",\n      \"length\": \"4:45\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 8,\n      \"title\": \"Happiness Is a Warm Gun\",\n      \"length\": \"2:43\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 9,\n      \"title\": \"Martha My Dear\",\n      \"length\": \"2:28\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 10,\n      \"title\": \"I’m So Tired\",\n      \"length\": \"2:03\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 11,\n      \"title\": \"Blackbird\",\n      \"length\": \"2:18\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 12,\n      \"title\": \"Piggies\",\n      \"length\": \"2:03\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 13,\n      \"title\": \"Rocky Raccoon\",\n      \"length\": \"3:33\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 14,\n      \"title\": \"Don't Pass Me By\",\n      \"length\": \"3:49\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 15,\n      \"title\": \"Why Don't We Do It in the Road\",\n      \"length\": \"1:41\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 16,\n      \"title\": \"I Will\",\n      \"length\": \"1:45\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 17,\n      \"title\": \"Julia\",\n      \"length\": \"2:54\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 18,\n      \"title\": \"Birthday\",\n      \"length\": \"2:43\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 19,\n      \"title\": \"Yer Blues\",\n      \"length\": \"4:02\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 20,\n      \"title\": \"Mother Nature’s Son\",\n      \"length\": \"2:46\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 21,\n      \"title\": \"Everybody’s Got Something to Hide Except Me and My Monkey\",\n      \"length\": \"2:25\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 22,\n      \"title\": \"Sexy Sadie\",\n      \"length\": \"3:15\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 23,\n      \"title\": \"Helter Skelter\",\n      \"length\": \"3:39\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 24,\n      \"title\": \"Long, Long, Long\",\n      \"length\": \"3:05\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 25,\n      \"title\": \"Revolution 1\",\n      \"length\": \"4:16\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 26,\n      \"title\": \"Honey Pie\",\n      \"length\": \"2:41\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 27,\n      \"title\": \"Savoy Truffle\",\n      \"length\": \"2:54\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 28,\n      \"title\": \"Cry Baby Cry\",\n      \"length\": \"3:02\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 29,\n      \"title\": \"Revolution 9\",\n      \"length\": \"8:21\"\n    },\n    {\n      \"id\": 3,\n      \"trackNumber\": 30,\n      \"title\": \"Good Night\",\n      \"length\": \"3:12\"\n    }\n  ]\n}"
