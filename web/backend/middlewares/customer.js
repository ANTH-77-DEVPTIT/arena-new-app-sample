import validateParams from '../helpers/validateParams.js'
import apiCaller from '../helpers/apiCaller.js'

const getAll = async () => {}

const count = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({ shop, accessToken, endpoint: `customers/count.json` })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    //handle pagination page and limit

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `customers.json`,
    })
  } catch (error) {
    throw error
  }
}

const findById = async ({ id, shop, accessToken }) => {
  try {
    validateParams({ shop, id, accessToken })

    return apiCaller({ shop, accessToken, endpoint: `customers/${id}.json` })
  } catch (error) {
    throw error
  }
}

const create = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({ shop, accessToken, method: 'POST', endpoint: `customers.json`, data })
  } catch (error) {
    throw error
  }
}

const update = async ({ shop, accessToken, id, data }) => {
  try {
    validateParams({ shop, accessToken, id, data })

    return await apiCaller({ shop, accessToken, method: 'PUT', endpoint: `customers/${id}.json` })
  } catch (error) {
    throw error
  }
}

const search = async ({ shop, accessToken, query }) => {
  try {
    validateParams({ shop, accessToken, query })

    return await apiCaller({ shop, accessToken, endpoint: `search.json?query=${query}` })
  } catch (error) {
    throw error
  }
}

const CustomerMiddleware = {
  getAll,
  count,
  find,
  findById,
  create,
  update,
  search,
}

export default CustomerMiddleware
