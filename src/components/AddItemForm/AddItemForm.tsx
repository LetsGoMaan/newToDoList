import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";

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
            <TextField value={newTaskTitle}
                       variant={"outlined"}
                       label={"Type value"}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={"primary"} size={"large"} >
                <AddTask/>
            </IconButton>
        </div>
    )

}