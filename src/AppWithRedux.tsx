import React, {useCallback} from "react";
import styles from "./App.module.css";
import {TaskType} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {addTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodolistWithRedux} from "./components/Todolist/TodolistWithRedux";

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
    console.log("App is called")
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    // const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    // const removeTask = (taskId: string, todolistId: string) => {
    //     dispatch(removeTaskAC(taskId, todolistId))
    // }
    // const addTask = (todolistId: string, newTaskTitle: string ) => {
    //     dispatch(addTaskAC(todolistId, newTaskTitle))
    // }
    // const changeFilter = (todolistId: string, filter: FilterButtonType) => {
    //     dispatch(changeTodolistFilterAC(todolistId, filter))
    // }
    // const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    //     dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    // }
    // const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    //     dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    // }
    // const removeTodolist = (todolistId: string) => {
    //     dispatch(removeTodolistAC(todolistId))
    //
    // }
    // const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    //     dispatch(changeTodolistTitleAC(todolistId, newTitle))
    // }

    const addNewTodolist = useCallback((newTitle: string) => {
        debugger
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])

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
                            sx={{mr: 2}}>
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
                        return (
                            <Grid key={todo.id} item>
                                <TodolistWithRedux
                                    todoId={todo.id}
                                    title={todo.title}
                                    filter={todo.filter}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
