import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { convertData } from '../utils/processData'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv'
      )
      const parsed = convertData(response.data)
      setData(parsed)
      console.log(parsed)
    }
    fetchData()
  }, [])

  return (
    <div style={{ maxWidth: '1000px' }}>
      <h1>hi</h1>
    </div>
  )
}

export default App
