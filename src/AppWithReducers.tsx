import React, {useReducer} from "react";
import styles from "./App.module.css";
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterButtonType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterButtonType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    const todolists1 = v1()
    const todolists2 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolists1, title: "What to learn", filter: "all"},
        {id: todolists2, title: "What to read", filter: "all"},
    ])
    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolists1]: [
            {id: v1(), title: "War and Peace", isDone: false},
            {id: v1(), title: "Art of War", isDone: true},
            {id: v1(), title: "Noise and Fury", isDone: false},
        ],
        [todolists2]: [
            {id: v1(), title: "War and Peace", isDone: false},
            {id: v1(), title: "Art of War", isDone: true},
            {id: v1(), title: "Noise and Fury", isDone: false},
        ]
    })
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeFilter = (todolistId: string, filter: FilterButtonType) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatchToTodolistsReducer(action)
    }
    const addTask = (todolistId: string, newTaskTitle: string ) => {
        const action = addTaskAC(todolistId, newTaskTitle)
        dispatchToTasksReducer(action)
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const addNewTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolistsReducer(action)
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
                        let filteredTasks = tasksObj[todo.id]
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

export default AppWithReducers;
