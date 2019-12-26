import { Component, OnInit } from '@angular/core';
import { Store, select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoService } from '../todos/todo.service';
import * as todoActions from './state/todo.actions';
import * as fromTodo from './state/todo.reducer';

import { Todo } from './todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  public todos$: Observable<Todo[]>;
  public inputValue;
  public newTodo;
  public showUpdate;
  public showClear: boolean = false;
  public interests = [];
  SelectedIDs=[];
  public pagedItems;


  constructor(
    private todoService: TodoService ,
    private store: Store<fromTodo.AppState> ) { }

  ngOnInit() {
    this.store.dispatch(new todoActions.LoadTodos()) //dispatch an action when component is intialized 
    this.todos$ = this.store.pipe(select(fromTodo.getTodos)) // subscribe the store map over the todo state 
    console.log(this.todos$);
  }

  addTodo(event: any) { 
    console.log(event.target.value);
    if(!event.target.value){
      this.clearSearch()
    }
    else{
      const todo = {id:Math.ceil(Math.random()*100), name: event.target.value, isSelected:false}
      this.store.dispatch(new todoActions.CreateTodo(todo))
      this.clearSearch();
    }
  }

  deleteTodo(todo: Todo){
    if(confirm("Sure you want to delete this todo?")){
      this.store.dispatch(new todoActions.DeleteTodo(todo.id))
    }
  }

  updateTodo(todo: Todo, newTodo){
    console.log(todo);
    const updateTodo = {id: todo.id, name: newTodo, isSelected:false}
    if(this.newTodo !== '' && this.newTodo !== undefined){
      this.store.dispatch(new todoActions.UpdateTodo(updateTodo));
      this.showUpdate = this.todoService.toggleShow();
      this.newTodo = '';
    }
  }

  clearSearch(){
    this.inputValue = '';
  }

  toggleUpdate(){
    this.todoService.toggleShow();
    this.showUpdate = this.todoService.isShown;
  }


  selectID(todo, event:any){
    if(event.target.checked){
      this.SelectedIDs.push(todo);
      console.log(this.SelectedIDs);
    }

        if (!event.target.checked) {

      let index = this.SelectedIDs.indexOf(todo.id);
      if (index > -1) {
        this.SelectedIDs.splice(index, 1);
      }
    }

}
  allClear(){
    // console.log(this.interests);
    this.store.dispatch(new todoActions.MultiDelete(this.SelectedIDs));
     this.SelectedIDs = [];
  }


}
