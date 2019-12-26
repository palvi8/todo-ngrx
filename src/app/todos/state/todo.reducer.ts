
// const initialState = {
//     todos :[
//         {
//             "id": 1,
//             "name": "Initial Todo"
//         },
//         {
//             "id": 2,
//             "name": "Initial2 Todo"
//         }        
//     ],
//     loading: false,
//     loaded: true
// };

// export function todoReducer(state = initialState, action){
//     switch(action.type){
//         


//         default: {
//             return state
//         }
//     }
// }

import * as todoActions from "./todo.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Todo } from '../todo.model';
import * as fromRoot from "../../state/app-state";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";


export interface TodoState extends EntityState<Todo>{
    selectedTodoId: number | null;
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState{
    todos: TodoState
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();


export const defaultTodo: TodoState = {
    ids: [],
    entities: {},
    selectedTodoId: null,
    loading: false,
    loaded: false,
    error: ""
  };


export const initialState = todoAdapter.getInitialState(defaultTodo); //assign default todos to initail state

export function todoReducer(
    state = initialState, 
    action: todoActions.Action):TodoState{
        switch(action.type){

            case todoActions.TodoActionTypes.LOAD_TODOS_SUCCESS:{
                return todoAdapter.addAll(action.payload, {  //use addAll method to add the todo
                    ...state,
                    loading: false,
                    loaded: true
                  });
            }

            case todoActions.TodoActionTypes.LOAD_TODOS_FAIL:{
                return {
                    ...state,
                    entities: {},
                    loading: false,
                    loaded: false,
                    error: action.payload
                  };
            }   
            

            case todoActions.TodoActionTypes.CREATE_TODO_SUCCESS:{
                return todoAdapter.addOne(action.payload, state);
            }

            case todoActions.TodoActionTypes.CREATE_TODO_FAIL:{

                return {
                    ...state,
                    error: action.payload
                  };                
            }



            case todoActions.TodoActionTypes.DELETE_TODO_SUCCESS: {
                return todoAdapter.removeOne(action.payload, state);
            }

            case todoActions.TodoActionTypes.DELETE_TODO_FAIL: {
                return {
                    ...state,
                    error: action.payload
                  };
            }

            case todoActions.TodoActionTypes.UPDATE_TODO_SUCCESS: {

                return todoAdapter.updateOne(action.payload, state);
            }

            case todoActions.TodoActionTypes.UPDATE_TODO_FAIL: {
                return {
                    ...state,
                    error: action.payload
                  };
            }     
            
            case todoActions.TodoActionTypes.MULTI_DELETE_TODO_SUCCESS: {
                return {
                    ...state
                }
            }

            case todoActions.TodoActionTypes.MULTI_DELETE_TODO_FAIL: {
                return {
                    ...state,
                    error: action.payload
                  };
            }           

            default: {
                return state; 
            }
        }
}

const getTodosFeatureState = createFeatureSelector<TodoState>(   //define feature selector for the todo slice 
    "todos"
)

export const getTodos = createSelector(
    getTodosFeatureState,
    todoAdapter.getSelectors().selectAll  //to get the properties from the state 
);

export const getTodosLoading = createSelector(
    getTodosFeatureState,
    (state: TodoState) => state.loading
);

export const getTodosLoaded = createSelector(
    getTodosFeatureState,
    (state: TodoState) => state.loaded
);

export const getError = createSelector(
    getTodosFeatureState,
    (state: TodoState) => state.error
);

