import React, {ChangeEvent} from "react";
import {FilterButtonType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import styles from './Todolists.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";


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
    changeFilter: (todolistId: string, filter: FilterButtonType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterButtonType
    removeTodolist:(todolistId: string) => void
    changeTodolistTitle:(todolistId: string, newTitle: string ) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const onAllClickHandler = () => {
        props.changeFilter(props.todoId,"all", )
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todoId,"active", )
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todoId,"completed", )
    }
    const onClickDeleteHandler = () => {
        props.removeTodolist(props.todoId)
    }
    const addTaskNewTitle = (newTitle: string) => {
        props.addTask(props.todoId, newTitle )
    }
    const onChangeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todoId, newTitle)
    }

    return (
        <>
            <div className={styles.todolistContainer}>
                <h3 className={styles.todoTitle}>
                    {/*// className={styles.todoTitle}{props.title}*/}
                    <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={onClickDeleteHandler}>
                    <Delete/>
                </IconButton>
                <AddItemForm addItem={addTaskNewTitle}/>
                <ul className={styles.tasksList}>
                    {props.tasks.map((task) => {
                            const onRemoveTaskHandler = () => {
                                props.removeTask(task.id, props.todoId)
                            }
                            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoId)
                            }
                            const onChangeTaskTitleHandler = (newTitle: string) => {
                                props.changeTaskTitle(task.id, newTitle, props.todoId)
                            }
                        return (
                            <li key={task.id} className={ task.isDone ? styles.finishedTask : styles.tasks} >
                                <Checkbox onChange={onChangeTaskStatusHandler}  checked={task.isDone}/>
                                <IconButton className={styles.taskDeleteButton} onClick={onRemoveTaskHandler}>
                                    <Delete/>
                                </IconButton>
                                <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                            </li>)}
                        )
                    }
                        
                </ul>
                <div>
                    <Button variant={props.filter === "all" ? "contained": 'text'} color={"primary"} onClick={onAllClickHandler}>All</Button>
                    <Button variant={props.filter === "active" ? "contained": 'text'} color={"primary"} onClick={onActiveClickHandler}>Active</Button>
                    <Button variant={props.filter === "completed" ? "contained": 'text'}   color={"primary"} onClick={onCompletedClickHandler}>Completed</Button>
                </div>
            </div>

        </>
    );
};

