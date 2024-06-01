import React, { createContext, useEffect, useState } from 'react';
import { TaskData } from './Components/Task';
import TaskContext from './TasksContext';
import axios from 'axios';


const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyTasks, setDailyTasks] = useState<TaskData[]>([]);
  const [normalTasks, setNormalTasks] = useState<TaskData[]>([]);

  const firstUpdate = React.useRef(true);

  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false;
      return;
    }
    updateTasks();
  }, [dailyTasks, normalTasks]);

  const addTask = (task: TaskData, daily: boolean) => {
    if (daily) {
      setDailyTasks((prevTasks) => [...prevTasks, task]);
    } else {
      setNormalTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const deleteTask = (taskID: string, daily: boolean) => {
    if(daily){
      setDailyTasks((prevTasks) => prevTasks.filter((task) => task.taskID !== taskID));
    }
    else{
      setNormalTasks((prevTasks) => prevTasks.filter((task) => task.taskID !== taskID));
    }
  }
  const updateTasks = () => {
    //Post data to server
    let tasksList = dailyTasks.map(task => ({taskName: task.taskName, taskID: task.taskID, checked: task.checked, daily:true}));
    tasksList = tasksList.concat(normalTasks.map(task => ({taskName: task.taskName, taskID: task.taskID, checked: task.checked, daily:false})));
    try{
      axios.post('http://localhost:3000/', tasksList);
      console.log(normalTasks, dailyTasks);
    } catch (error){
      console.log(error);
    }
  }

  const clearTasks = () => {
    setDailyTasks([]);
    setNormalTasks([]);
  }

  return (
    <TaskContext.Provider value={{ dailyTasks, normalTasks, addTask, deleteTask, clearTasks, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default MyContextProvider;