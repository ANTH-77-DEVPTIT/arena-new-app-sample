import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const create = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({ shop, accessToken, method: 'POST', data, endpoint: `collects.json` })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, product_id, collection_id, limit, fields }) => {
  try {
    validateParams({ shop, accessToken })

    let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 20) : 20

    let endpoint = `collects.json?limit=${_limit}`
    if (fields) {
      endpoint += `&fields=${fields}`
    }
    if (product_id) {
      endpoint += `&product_id=${product_id}`
    }
    if (collection_id) {
      endpoint += `&collection_id=${collection_id}`
    }

    return await apiCaller({ shop, accessToken, endpoint })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, collect_id }) => {
  try {
    validateParams({ shop, accessToken, collect_id })

    return await apiCaller({ shop, accessToken, endpoint: `collects/${collect_id}.json` })
  } catch (error) {
    throw error
  }
}

const count = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({ shop, accessToken, endpoint: `collects/count.json` })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, collect_id }) => {
  try {
    validateParams({ shop, accessToken, collect_id })

    return await apiCaller({
      shop,
      accessToken,
      method: 'DELETE',
      endpoint: `collects/${collect_id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const ProductCollectMiddleware = {
  create,
  find,
  findById,
  count,
  delete: _delete,
}

export default ProductCollectMiddleware
