import validateParams from '../helpers/validateParams.js'
import apiCaller from '../helpers/apiCaller.js'

const find_single_collection = async ({ shop, accessToken, collection_id }) => {
  try {
    validateParams({ shop, accessToken, collection_id })

    return await apiCaller({ shop, accessToken, endpoint: `collections/${collection_id}.json` })
  } catch (error) {
    throw error
  }
}

const find_products = async ({ shop, accessToken, collection_id, limit }) => {
  try {
    validateParams({ shop, accessToken, collection_id })

    let _limit = limit
      ? parseInt(limit) >= 0 && parseInt(limit) <= 250
        ? parseInt(limit)
        : 20
      : 20

    let endpoint = `collections/${collection_id}/products.json?limit=${_limit}`

    return await apiCaller({
      shop,
      accessToken,
      endpoint,
    })
  } catch (error) {
    throw error
  }
}

const ProductCollectionMiddleware = {
  find_single_collection,
  find_products,
}

export default ProductCollectionMiddleware
