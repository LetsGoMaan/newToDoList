import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistAPI = {
    updateTodolist(todoId: string, title: string) {
        return  instance.put<ResponseType>(`todo-lists/${todoId}`,{title} )
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item:GetTodolistType}>>(`todo-lists/`,{title})
    },
    getTodolists() {
        return instance.get<GetTodolistType>(`todo-lists/`)
    }
}

export const taskAPI = {
    getTasks(todoId: string) {
        return instance.get<GetTaskType[]>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseType<{item:GetTaskType}>>(`todo-lists/${todoId}/tasks`,{title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string, taskId: string, title: string) {
        return  instance.put<ResponseType<{item:GetTaskType}>>(`todo-lists/${todoId}/tasks/${taskId}`,{title} )
    },
}


type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type GetTodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type GetTaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
