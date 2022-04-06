import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Itask } from '../model/task';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  
  todoForm!: FormGroup;

  // task moves
  tasks: Itask[] = [];
  inProgress: Itask[] = [];
  done: Itask[] = [];
  updateIndex: any;
  isEditEnabled: Boolean = false;


  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  // Add the task
  addTask() {
    this.tasks.push({
      discription: this.todoForm.value.title,
      done: true,
    });
    this.todoForm.reset();
  }

  // Delete the task
  deleteTodoTask(i: number) {
    this.tasks.splice(i, 1)
  }

  deleteProgressTask(i: number) {
    this.inProgress.splice(i, 1)
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1)
  }

  // Edit the task
  editTask(item: any, i: number) {
    this.todoForm.controls['title'].setValue(item.discription);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateBtn() {
    this.tasks[this.updateIndex].discription = this.todoForm.value.title;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.isEditEnabled = false;
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
