import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects'; // listen to the actions
import { Action } from '@ngrx/store'; //type action

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { TodoService } from '../todo.service';
import * as todoActions from '../state/todo.actions';
import { Todo } from '../todo.model';

@Injectable()
export class TodoEffect {
  constructor(
    private actions$: Actions, // inject actions from store , listen to them
    private todoService: TodoService
  ) { }

  @Effect() //register effect
  loadTodos$: Observable<Action> = this.actions$.pipe(  //listen for the action communicate with server
    ofType<todoActions.LoadTodos>(
      todoActions.TodoActionTypes.LOAD_TODOS
    ),
    mergeMap((actions: todoActions.LoadTodos) =>  //map over the actions  action = Loadtodos, 
      this.todoService.getTodos().pipe(
        map(
          (todos: Todo[]) =>
            new todoActions.LoadTodosSuccess(todos),
        ),
        catchError(err => of(new todoActions.LoadTodosFail(err)))
      )
  
    )
  );

  @Effect()
  createTodo$: Observable<Action> = this.actions$.pipe(
    ofType<todoActions.CreateTodo>(todoActions.TodoActionTypes.CREATE_TODO),
    map((action: todoActions.CreateTodo) => action.payload), 
    mergeMap((todo: Todo) =>
      this.todoService.createTodo(todo).pipe(
        map(
          (newtodo: Todo) =>
          new todoActions.CreateTodoSuccess(newtodo),
        ),
        catchError(err => of(new todoActions.CreateTodo(err)))
      )
    )
  );

  @Effect()
  deleteTodo$: Observable<Action> = this.actions$.pipe(
    ofType<todoActions.DeleteTodo>(
      todoActions.TodoActionTypes.DELETE_TODO
    ),
    map((action: todoActions.DeleteTodo) => action.payload),
    mergeMap((id: number) =>
      this.todoService.deleteTodo(id).pipe(
        map(() => new todoActions.DeleteTodoSuccess(id)),
        catchError(err => of(new todoActions.DeleteTodoFail(err)))
      )
    )
  ); 

  @Effect()
  updateTodo$: Observable<Action> = this.actions$.pipe(
    ofType<todoActions.UpdateTodo>(
      todoActions.TodoActionTypes.UPDATE_TODO
    ),
    map((action: todoActions.UpdateTodo) => action.payload),
    mergeMap((todo: Todo) =>
      this.todoService.updateTodo(todo).pipe(
        map(
          (updatedtodo: Todo) =>
            new todoActions.UpdateTodoSuccess({
              id: updatedtodo.id,
              changes: updatedtodo
            })
        ),
        catchError(err => of(new todoActions.UpdateTodoFail(err)))
      )
    )
  );


  @Effect()
  multiDeleteTodos$: Observable<any> = this.actions$.pipe(
    ofType<todoActions.MultiDelete>(
      todoActions.TodoActionTypes.MULTI_DELETE_TODO
    ),
    switchMap((action: any) => action.payload.map(item => {
      return new todoActions.DeleteTodo(item.id)
    })),
    catchError(err => of(new todoActions.DeleteTodoFail(err)))
  )

}
