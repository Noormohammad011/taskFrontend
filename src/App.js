import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import PrivateRoute from './Pages/PrivateRoute';

import Tasks from './Pages/Tasks';
import AuthProvider from './context/AuthProvider'
import Header from './components/Header';
import Task from './Pages/Task';
import EditTask from './Pages/EditTask';
import NotFoundPage from './Pages/NotFoundPage'

const App = () => {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/task'
              element={
                <PrivateRoute>
                  <Task />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/task/:id/edit'
              element={
                <PrivateRoute>
                  <EditTask/>
                </PrivateRoute>
              }
            ></Route>

            <Route path='/login' element={<Login />}></Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
