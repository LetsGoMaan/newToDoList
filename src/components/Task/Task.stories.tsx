import type {Meta, StoryObj} from "@storybook/react";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    task: {id: '1', title: 'JS', isDone: false},
    todoId: 'todolists1'
  },
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// export const TaskCopy = () => {
//    const task = useSelector<AppRootState, TaskType>(state=> state.tasks ['todolistId1'][0])
//   return <Task task={task} todoId={'todolists1'}/>
// };
//
// export const TaskWithReduxStory: Story = {
//   render: () => <TaskCopy/>
// };

