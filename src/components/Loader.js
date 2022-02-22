import React from 'react'

const Loader = () => {
    return (
      <div className='d-flex justify-content-center'>
        <div
          className='spinner-border'
          role='status'
          style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
          }}
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
}

export default Loader
