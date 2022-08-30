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

const find = async ({ shop, accessToken, limit, pageInfo, order }) => {
  try {
    validateParams({ shop, accessToken })

    //handle pagination page and limit
    let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 20) : 20

    let endpoint = `products.json?limit=${_limit}`
    if (pageInfo) {
      endpoint += `&page_info=${pageInfo}`
    } else {
      if (order) {
        endpoint += `&order=${order}`
      } else {
        endpoint += `&order=updated_at+desc`
      }
    }

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `customers.json`,
      pageInfo: true,
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
  console.log('🚀 ~ file: customer.js ~ line 66 ~ update ~ data', data)
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

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `customers/search.json?query=${query || ''}`,
    })
  } catch (error) {
    throw error
  }
}

const account_activation_url = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({
      shop,
      accessToken,
      method: 'POST',
      endpoint: `customers/${id}/account_activation_url.json`,
    })
  } catch (error) {
    throw error
  }
}

const send_invite = async ({ shop, accessToken, id, data }) => {
  try {
    validateParams({ shop, accessToken, id, data })

    return await apiCaller({
      shop,
      accessToken,
      method: 'POST',
      endpoint: `customers/${id}/send_invite.json`,
    })
  } catch (error) {
    throw error
  }
}

const customers_order = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `customers/${id}/orders.json`,
    })
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
  account_activation_url,
  send_invite,
  customers_order,
}

export default CustomerMiddleware
