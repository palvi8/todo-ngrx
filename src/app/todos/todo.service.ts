  
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Todo } from "./todo.model";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private todoUrl = "http://localhost:3000/todos";
  public isShown:boolean = false;
  

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl);
  }

  createTodo(payload: Todo): Observable<Todo>{
    console.log(payload);
    return this.http.post<Todo>(this.todoUrl, payload);
  }

  deleteTodo(payload: number) {
    console.log(payload); //get id of the selected list
    return this.http.delete(`${this.todoUrl}/${payload}`)
  }

  updateTodo(todo: Todo){
    console.log(todo);
    return this.http.patch<Todo>(`${this.todoUrl}/${todo.id}`,todo);
  }

  toggleShow(){
    this.isShown = ! this.isShown;
  }

  deleteAll(){
    
  }

}  