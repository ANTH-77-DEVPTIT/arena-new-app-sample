import apiCaller from '../../helpers/apiCaller.js'
import validateParams from '../../helpers/validateParams.js'

const create = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({ shop, accessToken, data, method: 'POST', endpoint: `orders.json` })
  } catch (error) {
    throw error
  }
}

const cancel_order = async ({ shop, accessToken, data, id }) => {
  try {
    validateParams({ shop, accessToken, data, id })

    return await apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `orders/${id}/cancel.json`,
    })
  } catch (error) {
    throw error
  }
}

const close_order = async ({ shop, accessToken, data, id }) => {
  try {
    //data is empty
    validateParams(data, shop, accessToken, id)

    return await apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `orders/${id}/close.json`,
    })
  } catch (error) {
    throw error
  }
}

const re_open_order = async ({ shop, accessToken, data, id }) => {
  try {
    validateParams({ shop, accessToken, data, id })

    return await apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `orders/${id}/open.json`,
    })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, limit, pageInfo, order }) => {
  try {
    validateParams({ shop, accessToken })

    let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 20) : 20

    let endpoint = `orders.json?limit=${_limit}`
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
      endpoint,
      pageInfo: true,
    })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({ shop, accessToken, endpoint: `orders/${id}.json` })
  } catch (error) {
    throw error
  }
}

const count = async ({ shop, accessToken, status, financial_status }) => {
  try {
    validateParams({ shop, accessToken })

    let endpoint = `orders/count.json`
    if (status) {
      endpoint += `?status=${status}`
    }
    if (financial_status) {
      endpoint += `?financial_status=${financial_status}`
    }

    return await apiCaller({ shop, accessToken, endpoint })
  } catch (error) {
    throw error
  }
}

const update = async ({ shop, accessToken, data, id }) => {
  try {
    validateParams({ shop, accessToken, data, id })

    return await apiCaller({
      shop,
      accessToken,
      method: 'PUT',
      data,
      endpoint: `orders/${id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({ shop, accessToken, method: 'DELETE', endpoint: `orders/${id}.json` })
  } catch (error) {
    throw error
  }
}

const OrderMiddleware = {
  create,
  cancel_order,
  close_order,
  re_open_order,
  find,
  findById,
  count,
  update,
  delete: _delete,
}

export default OrderMiddleware
