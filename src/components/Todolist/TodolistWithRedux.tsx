import React, {useCallback} from "react";
import {FilterButtonType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import styles from "./Todolists.module.css"
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {addTaskAC} from "../../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../state/todolists-reducer";
import {Task} from "../Task/Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todoId: string
    title: string
    filter: FilterButtonType
}

export const TodolistWithRedux = React.memo((props: TodolistPropsType) => {
    console.log("Todolist is called")
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todoId])
    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todoId, "all"))
    }, [dispatch, props.todoId])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todoId, "active"))
    }, [dispatch, props.todoId])
    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todoId, "completed"))
    }, [dispatch, props.todoId])

    const onClickDeleteHandler = useCallback(() => {
        dispatch(removeTodolistAC(props.todoId))
    }, [dispatch, props.todoId])
    const addTaskNewTitle = useCallback((newTitle: string) => {
        dispatch(addTaskAC(props.todoId, newTitle))
    }, [dispatch, props.todoId])
    const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todoId, newTitle))
    }, [dispatch, props.todoId])

    if (props.filter === "active") {
        tasks = tasks.filter(task => !task.isDone)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(task => task.isDone)
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
                    {tasks.map((task) => <Task key={task.id} task={task} todoId={props.todoId}/>
                        // {
                        //     const onRemoveTaskHandler = () => {
                        //         dispatch(removeTaskAC(task.id, props.todoId))
                        //     }
                        //     const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        //         dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.todoId))
                        //     }
                        //     const onChangeTaskTitleHandler = (newTitle: string) => {
                        //         dispatch(changeTaskTitleAC(task.id, newTitle, props.todoId))
                        //     }
                        //     return (
                        //         <li key={task.id} className={task.isDone ? styles.finishedTask : styles.tasks}>
                        //             <Checkbox onChange={onChangeTaskStatusHandler} checked={task.isDone}/>
                        //             <IconButton className={styles.taskDeleteButton} onClick={onRemoveTaskHandler}>
                        //                 <Delete/>
                        //             </IconButton>
                        //             <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                        //         </li>)
                        // }
                    )
                    }

                </ul>
                <div>
                    <Button variant={props.filter === "all" ? "contained" : "text"} color={"primary"}
                            onClick={onAllClickHandler}>All</Button>
                    <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button variant={props.filter === "completed" ? "contained" : "text"} color={"primary"}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </div>
            </div>

        </>
    );
})


