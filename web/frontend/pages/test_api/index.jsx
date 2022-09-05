import SubmitionApi from '../../apis/submition.js'

function TestApi() {
  const handleTestApi = async () => {
    try {
      const res = await SubmitionApi.submit()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={handleTestApi}>Test Api</button>
}

export default TestApi
