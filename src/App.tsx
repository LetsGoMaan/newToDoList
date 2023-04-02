import React, {useState} from "react";
import styles from "./App.module.css";
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterButtonType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterButtonType
}

function App() {
    const todolists1 = v1()
    const todolists2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolists1, title: "What to learn", filter: "active"},
        {id: todolists2, title: "What to read", filter: "completed"},
    ])
    const [tasksObj, setTasks] = useState({
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
    const changeFilter = (filter: FilterButtonType, todolistId: string) => {
        const todolist = todolists.find(todo => todo.id === todolistId )
        if(todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }

    }
    const addTask = (newTaskTitle: string, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        tasksObj[todolistId] = [newTask, ...tasks ]
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
    const removeTodolist = (todolistId: string) => {
        const filteredTodolist = todolists.filter(todo => todo.id !== todolistId)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }




    return (
        <div className={styles.appContainer}>
            {todolists.map(todo => {
                let filteredTasks = tasksObj[todo.id]
                if (todo.filter === "active") {
                    filteredTasks = filteredTasks.filter(task => !task.isDone)
                }
                if (todo.filter === "completed") {
                    filteredTasks = filteredTasks.filter(task => task.isDone)
                }
                return (
                    <Todolist
                        key={todo.id}
                        todoId={todo.id}
                        title={todo.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todo.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
