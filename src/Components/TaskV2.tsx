import { Button, Checkbox, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { TaskData } from "./Task";
import './TaskV2.css';
import TaskContext from "../TasksContext";
import { useDispatch } from "react-redux";
import { DeleteTaskAcction, ChangeTaskAcction } from "../Actions";
import { useNavigate } from "react-router-dom";

interface TaskV2Props {
  task: TaskData;
  isChecked: boolean;
  onTaskChange: () => void;
}

function TaskV2({ task, onTaskChange }: TaskV2Props) {
  const [checked, setChecked] = useState<boolean>(task.checked);
  const TaskID = task.taskID;
  const context = useContext(TaskContext);
  const dispach = useDispatch();
  const navigate = useNavigate();

  const deleteTask = () => {
    navigate('/DeleteTask', { state: { taskID: TaskID, daily: task.daily } });
  };
  const handleChange = () => {
    context?.dailyTasks.filter((task) => task.taskID === TaskID).map((task) => task.checked = !task.checked);
    setChecked(!checked);
    onTaskChange();
    dispach(ChangeTaskAcction(TaskID));
  };
  return (
    <Button className="ButtonOuter" onClick={handleChange} >
      <span className="Text" style={{textDecoration:checked? 'line-through' : 'none'}}>
        {task.taskName}
      </span>
        <Button className="ButtonDelete" onClick={deleteTask} variant='outlined' color='error'>
          X
        </Button>
    </Button>
  );
}
export default TaskV2;