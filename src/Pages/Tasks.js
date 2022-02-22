import React, { useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import DateTimePicker from 'react-datetime-picker'
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth'
const Tasks = () => {
  const { user } = useAuth()
  const [selectedTimezone, setSelectedTimezone] = useState({})
  const [value, onChange] = useState(new Date())
  const [text, settext] = useState('')

  const handleTaskSubmit = (e) => {
    // collect data
    const task = {
      time: value,
      timezone: selectedTimezone,
      text: text,
      user: user.email,
    }
    console.log(task)

    fetch('https://whispering-brushlands-19407.herokuapp.com/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Task added successfully',
            showConfirmButton: false,
            timer: 1500,
          })
          setSelectedTimezone({})
          settext('')
          onChange(new Date())
        }
      })

    e.preventDefault()
  }
  return (
    <>
      <h1 className='text-center my-5'>Task Creation</h1>
      <form className='row g-3 mx-2' onSubmit={handleTaskSubmit}>
        <div className='col-md-6 offset-md-3 '>
          <label for='formGroupExampleInput' className='form-label'>
            Text
          </label>
          <input
            type='text'
            className='form-control'
            id='formGroupExampleInput'
            placeholder='Input Text'
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
        </div>

        <div className='col-md-6 offset-md-3'>
          <label htmlFor='inputZip' className='form-label'>
            Time Zone
          </label>
          <TimezoneSelect
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />
        </div>
        <div className='col-md-6 offset-md-3'>
          <label htmlFor='inputZip' className='form-label'>
            Time Picker
          </label>
          <DateTimePicker onChange={onChange} value={value} />
        </div>

        <div className='col-md-6 offset-md-3'>
          <button type='submit' className='btn btn-primary'>
            Add Task
          </button>
        </div>
      </form>
    </>
  )
}

export default Tasks
