import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    TaskListComponent,
    AboutComponent,],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
