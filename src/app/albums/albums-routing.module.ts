import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';


const routes: Routes = [
  { path: "", pathMatch: "full", component: AlbumListComponent },
  {
    path: ":id", component: AlbumDetailsComponent, children: [{
    path: "edit", component: AlbumEditComponent, canDeactivate: [CanDeactivateGuard]
  }]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],


exports: [RouterModule]
})
export class AlbumsRoutingModule { }
