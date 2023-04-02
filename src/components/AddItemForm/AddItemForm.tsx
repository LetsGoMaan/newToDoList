import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./AddItemForm.module.css";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState("")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }

    }
    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? styles.error : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            <div className={styles.errorMessage}>{error}</div>
        </div>
    )

}