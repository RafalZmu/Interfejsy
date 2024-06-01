import React from 'react';
import { useContext } from 'react';
import TaskContext from '../TasksContext';
import { useDispatch } from 'react-redux';
import { DeleteTaskAcction } from '../Actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function TaskDeleteConfirmation() {
  const location = useLocation();
  const TaskID = location.state.taskID;
  const daily = location.state.daily;
  const updateTasks = location.state.updateTasks;
  const context = useContext(TaskContext);
  const dispach = useDispatch();
  const navigate = useNavigate();

  const DeleteTask = () => {
    if (context === undefined) {
      throw new Error("useTasks must be used within a TasksProvider");
    }
    console.log(TaskID);
    context.deleteTask(TaskID, daily || false);
    dispach(DeleteTaskAcction(TaskID));
    navigate("/");
  };
  function GoToMainPage(): void {
    navigate("/");
  }

  return (
    <Dialog
      open={true}
      onClose={GoToMainPage}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={GoToMainPage} color="primary">
          Cancel
        </Button>
        <Button onClick={DeleteTask} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDeleteConfirmation;