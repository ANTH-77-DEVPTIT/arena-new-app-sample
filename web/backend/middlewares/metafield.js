import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const count = async ({ shop, accessToken, resource }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `${resource || ''}metafields/count.json`,
    })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, resource }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `${resource || ''}metafields.json`,
    })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, resource, metafield_id }) => {
  try {
    validateParams({ shop, accessToken, metafield_id })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `${resource || ''}metafields/${metafield_id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const create = async ({ shop, accessToken, resource, data }) => {
  console.log('🚀 ~ file: metafield.js ~ line 47 ~ create ~ resource', resource)
  try {
    validateParams({ shop, accessToken, data })
    // endpoint: `/products/7834737737982/metafields.json`,

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `${resource || ''}metafields.json`,
      method: 'POST',
      data,
    })
  } catch (error) {
    throw error
  }
}

const create_metafields = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({
      shop,
      accessToken,
      method: 'POST',
      data,
      endpoint: `metafields.json`,
    })
  } catch (error) {
    throw error
  }
}

const update = async ({ shop, accessToken, resource, metafield_id, data }) => {
  try {
    validateParams({ shop, accessToken, metafield_id, data })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `${resource || ''}metafields/${metafield_id}.json`,
      method: 'PUT',
      data,
    })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, resource, metafield_id }) => {
  try {
    validateParams({ shop, accessToken, metafield_id })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `${resource || ''}metafields/${metafield_id}.json`,
      method: 'DELETE',
    })
  } catch (error) {
    throw error
  }
}

const MetafieldMiddleware = {
  count,
  find,
  findById,
  create,
  create_metafields,
  update,
  delete: _delete,
}

export default MetafieldMiddleware
