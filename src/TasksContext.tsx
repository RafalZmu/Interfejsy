import React, { useState } from 'react';

interface TaskData {
  taskName: string;
  taskID: string;
  checked: boolean;
  daily?: boolean;
}

interface TaskContext {
  // Define your context value type here
  dailyTasks: TaskData[];
  normalTasks: TaskData[];
  addTask: (task: TaskData, daily: boolean) => void;
  deleteTask: (taskID: string, daily: boolean) => void;
  clearTasks: () => void;
  updateTasks: () => void;
  // other properties
}

const MyContext = React.createContext<TaskContext | undefined>(undefined);

export default MyContext;
