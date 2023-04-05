import React from "react";
import styles from "./App.module.css";
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterButtonType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterButtonType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }
    const changeFilter = (todolistId: string, filter: FilterButtonType) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }
    const addTask = (todolistId: string, newTaskTitle: string ) => {
        const action = addTaskAC(todolistId, newTaskTitle)
        dispatch(action)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    }
    const addNewTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)

    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }


    return (
        <div className={styles.appContainer}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{paddingTop: "10px"}}>
                    <AddItemForm addItem={addNewTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(todo => {
                        let filteredTasks = tasks[todo.id]
                        if (todo.filter === "active") {
                            filteredTasks = filteredTasks.filter(task => !task.isDone)
                        }
                        if (todo.filter === "completed") {
                            filteredTasks = filteredTasks.filter(task => task.isDone)
                        }
                        return (
                            <Grid item>
                                <Todolist
                                    key={todo.id}
                                    todoId={todo.id}
                                    title={todo.title}
                                    tasks={filteredTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={todo.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
