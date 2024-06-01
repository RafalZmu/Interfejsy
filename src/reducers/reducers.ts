import { AnyAction, Reducer, combineReducers } from 'redux';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TaskState{
  tasks: Task[];
}

// Define a reducer
const tasksReducer: Reducer<TaskState, AnyAction> = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "CHANGE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;