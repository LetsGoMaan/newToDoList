import {FilterButtonType, TodolistType} from "../App";
import {v1} from "uuid";



export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterButtonType
}

type ActionsType = RemoveTodolistAT | AddTodolistAT |  ChangeTodolistTitleAT | ChangeTodolistFilterAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
        let todolist = state.find(todo => todo.id === action.id)
            if(todolist) {
                todolist.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(todo => todo.id === action.id)
            if(todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id ,title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterButtonType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id ,filter: filter}
}

