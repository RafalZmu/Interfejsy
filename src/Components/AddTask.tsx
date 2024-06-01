import React, { useState, useContext } from 'react';
import { TextField, Card, Button } from '@mui/material';
import TaskContext from '../TasksContext';
import { AddTaskAcction } from '../Actions/index'
import { useDispatch } from 'react-redux';

interface AddTaskProps {
  isDaily?: boolean;
}

export interface TaskData {
  taskName: string;
  taskID: string;
  checked: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({isDaily }) => {
  const dispach = useDispatch();
  const [text, setText] = useState<string>('');
  const context = useContext(TaskContext);
  if(!context){
    throw new Error('useTasks must be used within a TasksProvider');
  }

  const addTask = () => {
    if (text.trim() !== '') {
      const newTask: TaskData = { taskName: text, taskID: getuid(), checked: false};
      if(isDaily){
        context.addTask(newTask, true);
        console.log(context.dailyTasks);
      }
      else{
        context.addTask(newTask, false);
        console.log(newTask);
      }
      setText('');
      dispach(AddTaskAcction(newTask.taskName));
      context.updateTasks();
    }
  };
  function getuid() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <Card style={{ display: 'flex' }}>
      <TextField
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
        style={{ width: '90%' }}
        label="Task name"
        variant="outlined"
      />
      <Button onClick={addTask} style={{ width: '10%' }} variant="contained" color="primary">
        Add
      </Button>
    </Card>
  );
};

export default AddTask;
