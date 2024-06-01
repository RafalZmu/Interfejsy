export const AddTaskAcction = (value: string) => ({
  type: 'ADD_TASK',
  payload: value
});
export const DeleteTaskAcction = (value: string) => ({
  type: 'DELETE_TASK',
  payload: value
});

export const ChangeTaskAcction = (value: string) => ({
  type: 'CHANGE_TASK',
  payload: value
});

export const ClearTasksAcction = () => ({
  type: 'CLEAR_TASKS'
});

export const UpdateTasksAcction = () => ({
  type: 'UPDATE_TASKS'
});