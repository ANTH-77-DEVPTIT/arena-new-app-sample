import React from 'react'
import SubmitionApi from '../../apis/submition'

const TestSubmition = () => {
  const handleClick = async () => {
    try {
      const res = await SubmitionApi.submit()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>testSubmit</button>
    </div>
  )
}

export default TestSubmition
