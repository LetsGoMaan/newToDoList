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
}

export const Todolist = (props: TodolistPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
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
                           onKeyDown={onKeyDownHandler}/>
                    <button onClick={() => {
                        props.addTask(newTaskTitle)
                        setNewTaskTitle("")
                    }}>+
                    </button>
                </div>
                <ul className={styles.tasksList}>
                    {props.tasks.map((task) => {
                            const onRemoveTaskHandler = () => {
                                props.removeTask(task.id)
                            }
                        return (
                            <li key={task.id} className={styles.tasks}><input type="checkbox" checked={task.isDone}/>
                                <button onClick={onRemoveTaskHandler} className={styles.taskDeleteButton}>x
                                </button>
                                <span className={task.isDone ? styles.finishedTask : ""}>{task.title}</span>
                            </li>)}
                        )
                    }
                        
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>

        </>
    );
};
