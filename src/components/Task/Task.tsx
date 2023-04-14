import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import styles from "../Todolist/Todolists.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskType} from "../Todolist/TodolistWithRedux";

type TaskPropsType = {
    task: TaskType
    todoId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()
    const onRemoveTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todoId))
    }, [dispatch,props.task.id,props.todoId])
    const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todoId))
    }, [dispatch,props.task.id,props.todoId])
    const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newTitle, props.todoId))
    }, [dispatch,props.task.id,props.todoId])
    return (
        <li key={props.task.id} className={props.task.isDone ? styles.finishedTask : styles.tasks}>
            <Checkbox onChange={onChangeTaskStatusHandler} checked={props.task.isDone}/>
            <IconButton className={styles.taskDeleteButton} onClick={onRemoveTaskHandler}>
                <Delete/>
            </IconButton>
            <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler}/>
        </li>)
})