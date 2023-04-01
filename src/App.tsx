import React, {useState} from "react";
import styles from "./App.module.css";
import {TaskType, Todolist} from "./components/Todolist/Todolist";

export type FilterButtonType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>> ([
            {id: 1, title: "War and Peace", isDone: false},
            {id: 2, title: "Art of War", isDone: true},
            {id: 3, title: "Noise and Fury", isDone: false},
        ])
    const [filter, setFilter] = useState("all")


    const removeTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterButtonType ) => {
        setFilter(filter)
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
            />


        </div>
    );
}

export default App;
