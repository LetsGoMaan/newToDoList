import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import styles from "./Todolist.module.css"
import {FilterButtonType} from "../../App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterButtonType) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterButtonType
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
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError('Title is required')
        }

    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <>
            <div className={styles.todolistContainer}>
                <h3>{props.title}</h3>
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
                                props.removeTask(task.id)
                            }
                            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, e.currentTarget.checked)
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
