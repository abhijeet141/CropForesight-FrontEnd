import React from 'react'

const Loading = () => {
  return (
    <div id="spinner" className="center-loader">
      <img src="./earth.png" alt="preloading screen" />
      <div className="pre-text">
        <p>Welcome to <br /><span>Crop Foresight</span></p>
      </div>
    </div>
  )
}

export default Loading