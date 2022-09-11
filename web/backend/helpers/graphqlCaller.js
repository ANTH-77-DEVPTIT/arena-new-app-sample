import { Shopify } from '@shopify/shopify-api'
import validateParams from './validateParams.js'

export const generateGraphqlInput = (input) => {
  try {
    let _input = ''
    _input += '{'
    Object.keys(input).forEach((key) => (_input += `${key}: "${input[key]}",`))
    _input += '}'
    return _input
  } catch (error) {
    throw error
  }
}

const graphqlCaller = async ({ shop, accessToken, query, variables }) => {
  console.log('🚀 ~ file: graphqlCaller.js ~ line 17 ~ graphqlCaller ~ query', query)
  try {
    //query nhan vao duoi dang template string ``
    validateParams({ shop, accessToken, query })

    //GraphQL lay ra url cua cua hang  va accessToken cho cua hang do
    //truyen vao shop and accessToken
    const client = new Shopify.Clients.Graphql(shop, accessToken)

    let res =
      query && variables
        ? await client.query({ data: { query, variables } })
        : await client.query({ data: query })

    // data tra ve se co dang: data: {...}
    res = res.body.data

    // check userErrors
    let userErrors = res[Object.keys(res)[0]]?.userErrors
    if (userErrors?.[0]?.message) {
      throw userErrors[0]
    }

    return res
  } catch (error) {
    if (error?.response?.errors?.[0]?.message) {
      console.log('error.response.errors :>> ', error.response.errors)

      throw error.response.errors[0]
    }

    throw error
  }
}

export default graphqlCaller
