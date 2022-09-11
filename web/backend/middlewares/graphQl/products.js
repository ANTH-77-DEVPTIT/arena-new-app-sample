import graphqlCaller from '../../helpers/graphqlCaller.js'
import validateParams from '../../helpers/validateParams.js'

const graphQl = async ({ shop, accessToken, query }) => {
  try {
    validateParams({ shop, accessToken, query })

    return await graphqlCaller({ shop, accessToken, query })
  } catch (error) {
    throw error
  }
}

const GraphQlMiddleware = { graphQl }

export default GraphQlMiddleware
