import React from 'react';
import styles from './App.module.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 1, title: "JS", isDone: true},
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: "War and Peace", isDone: false},
        {id: 2, title: "Art of War", isDone: false},
        {id: 1, title: "Noise and Fury", isDone: false},
    ]


    return (
            <div className={styles.appContainer}>
                <Todolist title={"What to learn"} tasks={tasks1}/>
                <Todolist title={"What to read"} tasks={tasks2}/>
            </div>
    );
}

export default App;
