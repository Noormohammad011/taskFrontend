import React from 'react'
import useAuth from '../hooks/useAuth'
import {  useLocation, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
const Login = () => {

  const { user, signInWithGoogle, isLoading, authError } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, navigate)
  }
  return (
    <>
      <h1 className='text-center my-5'>Login</h1>
      {isLoading && <Loader />}
      {authError && <Message variant='danger'>{authError} </Message>}
      {user?.email && <Message variant='success'>Login successfully! </Message>}
      <div className='d-flex justify-content-center align-items-center'>
        <button
          type='button'
          className='btn btn-outline-dark col-md-6 offset-md-3 mx-auto'
          onClick={handleGoogleSignIn}
        >
          Google
        </button>
      </div>
    </>
  )
}

export default Login
