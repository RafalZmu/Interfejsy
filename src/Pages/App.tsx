import React, { useContext, useEffect } from 'react';
import { Card } from '@mui/material';
import './App.css';
import AddTask from '../Components/AddTask';
import Task from '../Components/Task';
import TaskV2 from '../Components/TaskV2';
import axios, { AxiosResponse } from 'axios';
import TaskContext from '../TasksContext';

function App() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  };

  useEffect(()=>{
    const response = axios.get('http://localhost:3000/');
    if (context.normalTasks.length > 0 || context.dailyTasks.length > 0) {
      console.log('Tasks already loaded');
      return;
    }
    context.clearTasks();
    response.then((res: AxiosResponse) => {
      res.data.forEach((task: any) => {
        if(task.daily === true){
          context.addTask({taskName: task.taskName, taskID: task.taskID, checked: task.checked, daily: true}, true);
        }
        else{
          context.addTask({taskName: task.taskName, taskID: task.taskID, checked: task.checked, daily: false}, false);
        }
      });
    });
  },[]);

  const handleTaskChange = () => () => {
    //Post data to server
    console.log(context.normalTasks, context.dailyTasks);
    let tasksList = context.dailyTasks.map(task => ({taskName: task.taskName, taskID: task.taskID, checked: task.checked, daily:true}));
    tasksList = tasksList.concat(context.normalTasks.map(task => ({taskName: task.taskName, taskID: task.taskID, checked: task.checked, daily:false})));
    try{
      axios.post("http://localhost:3000/", tasksList);
    } catch (error){
      console.log(error);
    }
  };

  return (
      <div className="App">
        <Card className="GridItem">
          To do
          {context.normalTasks.map((task) => (
            <Task
              key={task.taskID}
              task={task}
              isChecked={task.checked}
              onTaskChange={handleTaskChange()}
            />
          ))}
          <AddTask isDaily={false}/>
        </Card>
        <Card className="GridItem">
          Daily
          {context.dailyTasks.map((task) => (
            <TaskV2
              key={task.taskID}
              task={task}
              onTaskChange={handleTaskChange()}
              isChecked={task.checked}
            />
          ))}
          <AddTask isDaily={true} />
        </Card>
      </div>
  );
}

export default App;
