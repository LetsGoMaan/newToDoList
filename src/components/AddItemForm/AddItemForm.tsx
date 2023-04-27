import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm is called")
    let [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState("")
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if(error) setError('')
        if (e.key === "Enter") {
            addTaskHandler()
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
})