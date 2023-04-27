import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      // action: 'clicked'
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    addItem: action('Button clicked inside form')
  }
};

export const AddItemFormWithErrorStory = (args: AddItemFormPropsType) => {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args

      console.log("AddItemForm is called")
      let [newTaskTitle, setNewTaskTitle] = useState("")
      const [error, setError] = useState("Title is required")
      const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
          args.addItem(newTaskTitle.trim())
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
};
