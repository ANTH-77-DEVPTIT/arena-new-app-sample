import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const getAll = async ({ shop, accessToken, count }) => {
  try {
    validateParams({ shop, accessToken })

    let items = []
    let res = null
    let hasNextPage = true
    let nextPageInfo = ''

    while (hasNextPage) {
      res = await apiCaller({
        shop,
        accessToken,
        endpoint: `smart_collections.json?limit=100&page_info=${nextPageInfo}`,
        pageInfo: true,
      })

      items = items.concat(res.smart_collections)

      hasNextPage = res.pageInfo.hasNext
      nextPageInfo = res.pageInfo.nextPageInfo

      if (!isNaN(count) && parseInt(count) && items.length >= parseInt(count)) {
        hasNextPage = false
        nextPageInfo = ''

        items = items.slice(0, count)
      }
    }

    return items
  } catch (error) {
    throw error
  }
}

const count = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken })

    let endpoint
    if (id) {
      endpoint = `smart_collections/count.json?product_id=${id}`
    } else {
      endpoint = `smart_collections/count.json`
    }

    return await apiCaller({ shop, accessToken, endpoint })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, limit, pageInfo, order }) => {
  try {
    validateParams({ shop, accessToken })

    let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 50) : 50

    let endpoint = `smart_collections.json?limit=${_limit}`
    if (pageInfo) {
      endpoint += `&page_info=${pageInfo}`
    }
    if (order) {
      endpoint += `&order=${order}`
    } else {
      endpoint += `&order=updated_at+desc`
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

    return await apiCaller({ shop, accessToken, endpoint: `smart_collections/${id}.json` })
  } catch (error) {
    throw error
  }
}

const create = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `smart_collections.json`,
      method: 'POST',
      data,
    })
  } catch (error) {
    throw error
  }
}

const update = async ({ shop, accessToken, id, data }) => {
  try {
    validateParams({ shop, accessToken, id, data })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `smart_collections/${id}.json`,
      method: 'PUT',
      data,
    })
  } catch (error) {
    throw error
  }
}

const update_order_product = async ({ shop, accessToken, id, productIDs, sort_order, data }) => {
  try {
    validateParams({ shop, accessToken, id, data })

    let endpoint = `smart_collections/${id}/order.json?`

    let productQuery = productIDs.split(',')

    if (productQuery) {
      productQuery.map((product_id, index) => {
        endpoint += `products[]=${product_id}${index === productQuery.length - 1 ? '' : '&'}`
      })
    }
    if (sort_order) {
      endpoint += `?sort_order=${sort_order}`
    }

    return await apiCaller({ shop, accessToken, method: 'PUT', endpoint })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `smart_collections/${id}.json`,
      method: 'DELETE',
    })
  } catch (error) {
    throw error
  }
}

const SmartCollectionMiddleware = {
  getAll,
  count,
  find,
  findById,
  create,
  update,
  update_order_product,
  delete: _delete,
}

export default SmartCollectionMiddleware
