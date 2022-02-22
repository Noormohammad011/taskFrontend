import initializeAuthentication from '../Firebase/firebase.init'
import { useState, useEffect } from 'react'

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

// initialize firebase app
initializeAuthentication()

const useFirebase = () => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = (location, navigate) => {
    setIsLoading(true)
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result)
        setAuthError('')
        const destination = location?.state?.from || '/'
        navigate(destination)
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(() => setIsLoading(false))
  }

  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser({})
      }
      setIsLoading(false)
    })
    return () => unsubscribed
  }, [auth])

  const logout = () => {
    setIsLoading(true)
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false))
  }

  return {
    user,
    isLoading,
    authError,
    signInWithGoogle,
    logout,
  }
}

export default useFirebase
