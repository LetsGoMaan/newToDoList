import React, {useState} from "react";
import styles from "./App.module.css";
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterButtonType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>> ([
            {id: v1(), title: "War and Peace", isDone: false},
            {id: v1(), title: "Art of War", isDone: true},
            {id: v1(), title: "Noise and Fury", isDone: false},

        ])
    const [filter, setFilter] = useState<FilterButtonType>("all")


    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterButtonType ) => {
        setFilter(filter)
    }
    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const task = tasks.find(task => task.id === taskId)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let filteredTasks = tasks
    if( filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone )
    }
    if( filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone )
    }



    return (
        <div className={styles.appContainer}>
            <Todolist
                title={"What to read"}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter = {changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />


        </div>
    );
}

export default App;
