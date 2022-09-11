import SubmitionApiGraphQL from '../../apis/submition_graphQL.js'

function TestGrapgQL() {
  const handleTestApi = async () => {
    try {
      let res = await SubmitionApiGraphQL.submit()

      console.log('res', res)
    } catch (error) {
      throw error
    }
  }
  return <button onClick={handleTestApi}>Test api GraphQl</button>
}

export default TestGrapgQL
