import React from 'react'

const LoadingSpinner = ({loadingMessage}) => {
  return (
    <div className="flex flex-col justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 border-2"></div>
        <div className='text-center'>{loadingMessage}</div>
    </div>
  )
}

export default LoadingSpinner


