import SubmitionApi from '../../apis/submition.js'

function CustomersPage() {
  const handleTestApi = async () => {
    try {
      const res = await SubmitionApi.submit()
      console.log('res', res)
    } catch (error) {
      log('error', error)
    }
  }
  return <button onClick={handleTestApi}>Test Api</button>
}

export default CustomersPage
