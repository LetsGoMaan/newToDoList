import React, {useState} from "react";
import styles from "./App.module.css";
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

export type FilterButtonType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterButtonType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolists1 = v1()
    const todolists2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolists1, title: "What to learn", filter: "all"},
        {id: todolists2, title: "What to read", filter: "all"},
    ])
    const [tasksObj, setTasks] = useState<TasksStateType>({
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
        const tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter(task => task.id !== taskId)

        setTasks({...tasksObj})
    }
    const changeFilter = (todolistId: string, filter: FilterButtonType) => {
        const todolist = todolists.find(todo => todo.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }

    }
    const addTask = (todolistId: string, newTaskTitle: string,) => {
        const tasks = tasksObj[todolistId]
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        tasksObj[todolistId] = [newTask, ...tasks]
        setTasks({...tasksObj})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(task => task.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }
    const removeTodolist = (todolistId: string) => {
        const filteredTodolist = todolists.filter(todo => todo.id !== todolistId)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    const addNewTodolist = (newTitle: string) => {
        const newTodolist: TodolistType = {id: v1(), title: newTitle, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        tasksObj[newTodolist.id] = []
        setTasks({...tasksObj})
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(todo => todo.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{paddingTop: "10px"}}>
                    <AddItemForm addItem={addNewTodolist}/>
                </Grid>
                <Grid container spacing={5} >
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

    export default App;
