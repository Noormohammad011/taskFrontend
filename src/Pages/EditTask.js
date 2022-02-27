import React, { useState, useEffect } from 'react'
import TimezoneSelect from 'react-timezone-select'
import DateTimePicker from 'react-datetime-picker'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditTask = () => {
  const [data, setData] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const url = `http://localhost:5000/tasks/${id}`
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }, [id])

  const [selectedTimezone, setSelectedTimezone] = useState({})
  const [value, onChange] = useState(new Date())
  const [text, settext] = useState('')

  const handleTaskSubmit = (e) => {
    e.preventDefault()

    const task = {
      time: value,
      timezone: selectedTimezone,
      text: text,
    }

    const url = `http://localhost:5000/tasks/${id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Task updated successfully',
            showConfirmButton: false,
            timer: 1500,
          })
          setData({})
          e.target.reset()
          navigate('/task')
        }
      })
  }
  return (
    <>
      <h1 className='text-center my-5'>Edit Task</h1>
      <form className='row g-3 mx-2' onSubmit={handleTaskSubmit}>
        <div className='col-md-6 offset-md-3 '>
          <label htmlFor='formGroupExampleInput' className='form-label'>
            Text
          </label>
          <input
            type='text'
            className='form-control'
            id='formGroupExampleInput'
            placeholder='Input Text'
            value={text || '' || data.text}
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
          <button
            disabled={!text || !value || !selectedTimezone}
            type='submit'
            className='btn btn-primary'
          >
            Updata Task
          </button>
        </div>
      </form>
    </>
  )
}

export default EditTask
