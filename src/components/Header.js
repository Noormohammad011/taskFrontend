import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Header = () => {
  const { user, logout } = useAuth()
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          TaskMangement
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {user?.email ? (
              <>
                <li className='nav-item'>
                  <h4 className='px-4 my-2'>Welcome {user?.displayName}</h4>
                </li>

                <li className='nav-item px-3 my-2'>
                  <button
                    onClick={logout}
                    type='button'
                    className='btn btn-outline-dark'
                  >
                    Logout
                  </button>
                </li>
                <li className='nav-item px-3 my-2'>
                  <Link
                    to='/task'
                    type='button'
                    className='btn btn-outline-dark'
                  >
                    My Task
                  </Link>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-link active'
                  aria-current='page'
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header

// http://localhost:5000/
//http://localhost:5000/
