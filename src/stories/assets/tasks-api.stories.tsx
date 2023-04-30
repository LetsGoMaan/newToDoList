import React, {useEffect, useState} from "react"
import {taskAPI} from "../../api/api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    const todoId = "c34e891d-bec3-41b6-9253-d79a5960da4e"
        taskAPI.getTasks(todoId)
            .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "c34e891d-bec3-41b6-9253-d79a5960da4e"
       const title = "YOLO"
        taskAPI.createTask(todoId, title)
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'c34e891d-bec3-41b6-9253-d79a5960da4e'
        const taskId = '1cb47ff7-5cd7-4430-949f-a8d4e405914e'
        taskAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todoId = 'c34e891d-bec3-41b6-9253-d79a5960da4e'
        const taskId = 'c172c0ec-c13d-4d59-950a-8ed2551c13d2'
        const title = "KAVABANGA"
        taskAPI.updateTask(todoId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

