import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';


import { todoReducer } from '../state/todo.reducer';
import { TodoEffect } from '../state/todo.effects';
// import { TodosComponent } from '../todos.component';
// import { TodoListComponent } from '../todo-list/todo-list.component'
 

@NgModule({
  declarations: [
    // TodosComponent,
    // TodoListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature("todos", todoReducer),
    EffectsModule.forFeature([TodoEffect])
  ]
})
export class TodosModule { }
