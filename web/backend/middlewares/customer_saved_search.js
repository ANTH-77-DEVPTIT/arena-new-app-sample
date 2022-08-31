import validateParams from '../helpers/validateParams.js'
import apiCaller from '../helpers/apiCaller.js'

const create = async ({ shop, accessToken, data }) => {
  console.log('🚀 ~ file: customer_saved_search.js ~ line 5 ~ create ~ data', data)
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `customer_saved_searches.json`,
    })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({ shop, accessToken, endpoint: `customer_saved_searches.json` })
  } catch (error) {
    throw error
  }
}

const CustomerSavedSearchMiddleware = {
  create,
  find,
}

export default CustomerSavedSearchMiddleware
