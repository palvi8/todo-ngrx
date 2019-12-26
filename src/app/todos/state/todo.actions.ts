import { Action } from '@ngrx/store';
import { Todo } from '../todo.model';
import { Update } from "@ngrx/entity";  //import update type


export enum TodoActionTypes{  // for set of constants
    LOAD_TODOS = "[Todo] Load Todos",
    LOAD_TODOS_SUCCESS = "[Todo] Load Todos Success",
    LOAD_TODOS_FAIL = "[Todo] Load Todos Fail",


    CREATE_TODO = "[Todo] Create Todo",
    CREATE_TODO_SUCCESS = "[Todo] Create Todo Success",
    CREATE_TODO_FAIL = "[Todo] Create Todo Fail",   

    UPDATE_TODO = "[Todo] Update Todo",
    UPDATE_TODO_SUCCESS = "[Todo] Update Todo Success",
    UPDATE_TODO_FAIL = "[Todo] Update Todo FAIL",

    DELETE_TODO = "[Todo] Delete Todo",
    DELETE_TODO_SUCCESS = "[Todo] Delete Todo Success",
    DELETE_TODO_FAIL = "[Todo] Delete Todo FAIL",    

    MULTI_DELETE_TODO = "[Todo] Multi Delete Todos",
    MULTI_DELETE_TODO_SUCCESS = "[Todo] Multi Delete Todos Success",
    MULTI_DELETE_TODO_FAIL = "[Tod] Multi Delete Todos FAIL",  
    
}
//Load todos  // create actions using action creator , which are classes using 2 properties (tpye we specified readonly and their option are payload)
export class LoadTodos implements Action{
    readonly type = TodoActionTypes.LOAD_TODOS;
}

export class LoadTodosSuccess implements Action{
    readonly type = TodoActionTypes.LOAD_TODOS_SUCCESS;

    constructor(public payload: Todo[]){} 
}

export class LoadTodosFail implements Action{
    readonly type = TodoActionTypes.LOAD_TODOS_FAIL;

    constructor(public payload: string){}
}

//create todo
export class CreateTodo implements Action{
    readonly type = TodoActionTypes.CREATE_TODO;

    constructor(public payload: Todo){}
}

export class CreateTodoSuccess implements Action{
    readonly type = TodoActionTypes.CREATE_TODO_SUCCESS;

    constructor(public payload: Todo){} 
}

export class CreateTodoFail implements Action{
    readonly type = TodoActionTypes.CREATE_TODO_FAIL;

    constructor(public payload: string){}
}
//update todo
export class UpdateTodo implements Action{
    readonly type = TodoActionTypes.UPDATE_TODO;
    constructor(public payload: Todo){}
}

export class UpdateTodoSuccess implements Action{
    readonly type = TodoActionTypes.UPDATE_TODO_SUCCESS;
    constructor(public payload: Update<Todo>){} //payload type update
}

export class UpdateTodoFail implements Action{
    readonly type = TodoActionTypes.UPDATE_TODO_FAIL;
    constructor(public payload: string){}
}

//delete todo
export class DeleteTodo implements Action{
    readonly type = TodoActionTypes.DELETE_TODO;
    constructor(public payload: number){}
}

export class DeleteTodoSuccess implements Action{
    readonly type = TodoActionTypes.DELETE_TODO_SUCCESS;
    constructor(public payload: number){}
}

export class DeleteTodoFail implements Action{
    readonly type = TodoActionTypes.DELETE_TODO_FAIL;
    constructor(public payload: string){}
}

// multiple delete todos

export class MultiDelete implements Action{
    readonly type = TodoActionTypes.MULTI_DELETE_TODO;
    constructor(public payload: any){}
}

export class MultiDeleteSuccess implements Action{
    readonly type = TodoActionTypes.MULTI_DELETE_TODO_SUCCESS;
    constructor(public payload: number){}
}

export class MultiDeleteFail implements Action{
    readonly type = TodoActionTypes.MULTI_DELETE_TODO_FAIL;
    constructor(public payload: string){}
}

export type Action =  // define type that union all of the actions to make it available for rest of the actions 
    | LoadTodos 
    | LoadTodosSuccess 
    | LoadTodosFail
    | CreateTodo 
    | CreateTodoSuccess 
    | CreateTodoFail
    | UpdateTodo
    | UpdateTodoSuccess
    | UpdateTodoFail
    | DeleteTodo
    | DeleteTodoSuccess
    | DeleteTodoFail
    | MultiDelete
    | MultiDeleteSuccess
    | MultiDeleteFail
