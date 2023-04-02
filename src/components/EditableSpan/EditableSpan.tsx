import {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && title.trim() !== "") {
            setEditMode(false)
            props.onChange(title.trim())
        }
    }

    return (
        editMode ? <input  onChange={onChangeHandler} value={title} onBlur={activateViewMode} onKeyDown={onKeyDownHandler} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>

    )
}