import React from "react";
import styles from './Todolist.module.css'
import {FilterButtonType} from "../../App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=> void
    changeFilter:(filter: FilterButtonType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <>
            <div className={styles.todolistContainer}>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul className={styles.tasksList}>
                    {props.tasks.map(task =>
                        <li key={task.id} className={styles.tasks} ><input  type="checkbox" checked={task.isDone}/>
                            <button onClick={()=> {props.removeTask(task.id)}} className={styles.taskDeleteButton}>x</button>
                            <span className={task.isDone ? styles.finishedTask : ""}>{task.title}</span>
                        </li>)}
                </ul>
                <div>
                    <button onClick={()=>{props.changeFilter("all")}}>All</button>
                    <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                    <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
                </div>
            </div>

        </>
    );
};
