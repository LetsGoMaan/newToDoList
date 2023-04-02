import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import styles from "./Todolist.module.css"
import {FilterButtonType} from "../../App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterButtonType, todolistId: string) => void
    addTask: (newTaskTitle: string,  todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterButtonType
    removeTodolist:(todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle, props.todoId)
            setNewTaskTitle("")
        }
    }
    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.todoId)
            setNewTaskTitle("")
        } else {
            setError('Title is required')
        }

    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.todoId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.todoId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.todoId)
    }
    const onClickDeleteHandler = () => {
        props.removeTodolist(props.todoId)
    }

    return (
        <>
            <div className={styles.todolistContainer}>
                <h3 className={styles.todoTitle}>{props.title}</h3> <button onClick={onClickDeleteHandler}>X</button>
                <div>
                    <input value={newTaskTitle}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}
                           className={error ? styles.error : ''}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    <div className={styles.errorMessage}>{error}</div>
                </div>
                <ul className={styles.tasksList}>
                    {props.tasks.map((task) => {
                            const onRemoveTaskHandler = () => {
                                props.removeTask(task.id, props.todoId)
                            }
                            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoId)
                            }
                        return (
                            <li key={task.id} className={styles.tasks}><input onChange={onChangeTaskStatusHandler} type="checkbox" checked={task.isDone}/>
                                <button onClick={onRemoveTaskHandler} className={styles.taskDeleteButton}>x
                                </button>
                                <span className={task.isDone ? styles.finishedTask : ""}>{task.title}</span>
                            </li>)}
                        )
                    }
                        
                </ul>
                <div>
                    <button className={props.filter === "all" ? styles.activeFilter: ''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === "active" ? styles.activeFilter: ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === "completed" ? styles.activeFilter: ''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>

        </>
    );
};
