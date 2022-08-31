import { TextField } from '@shopify/polaris'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SubmitionApi from '../../apis/submition.js'

function CustomersPage(props) {
  const { location, navigation } = props
  console.log('🚀 ~ file: index.jsx ~ line 8 ~ CustomersPage ~ location', location)
  const [value, setValue] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()

  const handleTestApi = async () => {
    try {
      const res = await SubmitionApi.submit()
      console.log('res', res)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChange = (newValue) => {
    setValue(newValue)

    if (window.__searchTimeout) {
      clearTimeout(window.__searchTimeout)
    }

    window.__searchTimeout = setTimeout(() => {
      // onChange({ ...filter, keyword: value })
      setSearchParams({ query: newValue })
    }, 600)
  }

  return (
    <div>
      <button onClick={handleTestApi}>Test Api</button>
      <TextField label="Store name" value={value} onChange={handleChange} autoComplete="off" />
    </div>
  )
}

export default CustomersPage
