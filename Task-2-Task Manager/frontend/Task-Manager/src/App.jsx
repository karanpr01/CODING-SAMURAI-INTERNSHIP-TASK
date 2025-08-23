import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Admin/Dashboard';
import ManageTask from './pages/Admin/ManageTask';
import CreateTask from './pages/Admin/CreateTask';
import ManageUser from './pages/Admin/ManageUser';

import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTask';
import ViewTasksDetails from './pages/User/ViewTasksDetails';

import PrivatRoute from './routes/PrivatRoute';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/signup" element={ <Signup/> }/>

          {/* Admin Routes */}
          <Route element={<PrivatRoute allowedRoles={["admin"]}/>}>
          <Route path="/admin/dashboard" element={ <Dashboard/> } />
          <Route path="/admin/tasks" element={ <ManageTask/> } />
          <Route path="/admin/create-task" element={ <CreateTask/> } />
          <Route path="/admin/users" element={ <ManageUser/> } />
          </Route>

           {/* User Routes */}
          <Route element={<PrivatRoute allowedRoles={["admin"]}/>}>
          <Route path="/user/dashboard" element={ <UserDashboard/> } />
          <Route path="/user/tasks" element={ <MyTasks/> } />
          <Route path="/user/tasks-details" element={ <ViewTasksDetails/> } />
          </Route>

        </Routes>
      </Router>
    </div>
  )
}

export default App;