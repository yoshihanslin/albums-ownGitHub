import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  openTasks = [
    "Learn TS",
    "Learn Angular",
    "Learn debugging"
  ]
  closedTasks: string[] = [];
  constructor () { }

  ngOnInit(): void {
    let dummy = 0;
  }

  addPractice() {
    this.openTasks.push("Practice");
  }


  closeTask(index: number) {
    let removedTask = this.openTasks.splice(index, 1)[0];
    // this.openTasks = [...this.openTasks];
    this.closedTasks.push(removedTask);
    // this.closedTasks = [...this.closedTasks, removedTask];
  }

  reopenTask(index: number) {
    let reopenTask = this.closedTasks.splice(index, 1)[0];
    // this.closedTasks = [...this.closedTasks];
    this.openTasks.push(reopenTask);
    // this.openTasks = [...this.openTasks, reopenTask];

  }

}
