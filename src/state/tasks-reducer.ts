import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";


export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export type AddTaskAT = {
    type: "ADD-TASK"
    taskTitle: string
    todolistId: string
}
export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}




type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(task => task.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            let stateCopy = {...state}
            let newTask = {id: v1(), title: action.taskTitle, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(task => task.id === action.taskId)
            if(task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(task => task.id === action.taskId)
            if(task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return  stateCopy
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete  stateCopy[action.id]
            return  stateCopy
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD-TASK', taskTitle: taskTitle, todolistId: todolistId }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId }
}



