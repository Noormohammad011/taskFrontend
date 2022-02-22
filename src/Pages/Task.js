import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Task = () => {
  const [data, setData] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://whispering-brushlands-19407.herokuapp.com/tasks/`
      )

      setData(result.data)
    }

    fetchData()
  }, [])

  return (
    <div className='container'>
      <Link to='/' className='btn btn-outline-dark my-3'>
        Return Back
      </Link>
      <div className='row mx-auto'>
        <div className='col-md-6 offset-md-3'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TEXT</th>
                <th>TIME</th>
                <th>TIMEZONE</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  ?.filter((p) => p.user === user.email)
                  .map((x, i) => (
                    <tr key={x._id}>
                      <td>{i + 1}</td>
                      <td>{x.text}</td>
                      <td>{moment(x.time).format('MMM Do YY')}</td>
                      <td>{x.timezone.value}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Task
