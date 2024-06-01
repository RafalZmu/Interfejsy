import React, { useState, useEffect, useContext } from 'react';
import CheckBox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import { DeleteTaskAcction, ChangeTaskAcction } from '../Actions';
import './Task.css';
import TaskContext from '../TasksContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface TaskProps {
  isChecked?: boolean;
  task: TaskData;
  onTaskChange: () => void;
}

export interface TaskData {
  taskName: string;
  taskID: string;
  checked: boolean;
  daily?: boolean;
}

const Task: React.FC<TaskProps> = ({task, isChecked = true, onTaskChange }) => {
  const [checked, setChecked] = useState<boolean>(isChecked);
  const TaskID = task.taskID;
  const dispach = useDispatch();
  const context = useContext(TaskContext);
  const navigate = useNavigate();

  useEffect(() => {
    scheduleDailyReset();
  }, []);

  const deleteTask = () => {
    navigate('/DeleteTask', { state: { taskID: TaskID, daily: task.daily } });
  };

  const handleChange = () => {
    context?.normalTasks.filter((task) => task.taskID === TaskID).map((task) => task.checked = !task.checked);
    setChecked(!checked);
    onTaskChange();
    dispach(ChangeTaskAcction(TaskID));
  };

  const scheduleDailyReset = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeToReset = tomorrow.getTime() - today.getTime();
    setTimeout(() => {
      setChecked(false);
    }, timeToReset);
  };

  return (
    <Card variant='outlined' className="TaskContainer">
      <div className="Text">{task.taskName}</div>
      <CheckBox checked={checked} onChange={handleChange} />
      <Button onClick={deleteTask} className='Button' variant='outlined' color='error'>X</Button>
    </Card>
  );
};

export default Task;
