import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import TaskContextProvider from './TasksContextProvider';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskDeleteConfirmation from './Pages/TaskDeleteConfirmation';

ReactDOM.render(
  <Provider store={store}>
    <TaskContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/DeleteTask" element={<TaskDeleteConfirmation />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
      ,
    </TaskContextProvider>
    ,
  </Provider>,
  document.getElementById("root")
);

reportWebVitals(console.log);