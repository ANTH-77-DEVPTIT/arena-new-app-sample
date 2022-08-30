import validateParams from '../helpers/validateParams.js'
import apiCaller from '../helpers/apiCaller.js'

const create = async ({ shop, accessToken, customer_id, data }) => {
  try {
    validateParams({ shop, accessToken, customer_id, data })

    return await apiCaller({
      shop,
      accessToken,
      method: 'POST',
      data,
      endpoint: `customers/${customer_id}/addresses.json`,
    })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, customer_id }) => {
  try {
    validateParams({ shop, accessToken, customer_id })

    return apiCaller({ shop, accessToken, endpoint: `customers/${customer_id}/addresses.json` })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, customer_id, address_id }) => {
  try {
    validateParams({ shop, accessToken, customer_id, address_id })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `customers/${customer_id}/addresses/${address_id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const update_address = async ({ shop, accessToken, customer_id, address_id, data }) => {
  try {
    validateParams({ shop, accessToken, customer_id, address_id })

    return await apiCaller({
      shop,
      accessToken,
      method: 'PUT',
      data,
      endpoint: `customers/${customer_id}/addresses/${address_id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const update_default_address = async ({ shop, accessToken, customer_id, address_id }) => {
  try {
    validateParams({ shop, accessToken, customer_id, address_id })
    console.log(
      '🚀 ~ file: customer_address.js ~ line 63 ~ constupdate_default_address= ~ id',
      customer_id,
    )
    console.log(
      '🚀 ~ file: customer_address.js ~ line 63 ~ constupdate_default_address= ~ address_id',
      address_id,
    )

    return await apiCaller({
      shop,
      accessToken,
      method: 'PUT',
      endpoint: `customers/${customer_id}/addresses/${address_id}/default.json`,
    })
  } catch (error) {
    throw error
  }
}

const update_address_multi = async ({ shop, accessToken, customer_id, data }) => {
  try {
    validateParams({ shop, accessToken, customer_id })

    return await apiCaller({
      shop,
      accessToken,
      method: 'PUT',
      endpoint: `customers/${customer_id}/addresses/set.json?address_ids[]=${data['address_ids[]']}&operation=${data['operation']}`,
    })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, customer_id, address_id }) => {
  try {
    validateParams({ shop, accessToken, customer_id, address_id })

    return await apiCaller({
      shop,
      accessToken,
      method: 'DELETE',
      endpoint: `customers/${customer_id}/addresses/${address_id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const CustomerAddressMiddleware = {
  create,
  find,
  findById,
  update_address,
  update_default_address,
  update_address_multi,
  delete: _delete,
}

export default CustomerAddressMiddleware
