import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const update = async ({ shop, accessToken, data, id }) => {
  try {
    validateParams({ shop, accessToken, id, data })

    return await apiCaller({
      shop,
      accessToken,
      method: 'PUT',
      data,
      endpoint: `inventory_items/${id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const adjusts_inventory_level = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `inventory_levels/connect.json`,
    })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({ shop, accessToken, endpoint: `locations.json` })
  } catch (error) {
    throw error
  }
}

const InventoryMiddleware = {
  update,
  adjusts_inventory_level,
  find,
}

export default InventoryMiddleware
