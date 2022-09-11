import apiCaller from '../helpers/apiCaller.js'

const submit = async () => {
  return await apiCaller(`/api/submition_graphQL`)
}

const SubmitionApiGraphQL = { submit }

export default SubmitionApiGraphQL
