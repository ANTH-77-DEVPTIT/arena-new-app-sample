import validateParams from '../helpers/validateParams.js'
import apiCaller from '../helpers/apiCaller.js'

const create = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `application_charges.json`,
    })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `application_charges.json`,
    })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `application_charges/${id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const ApplicationChargeMiddleware = { create, find, findById }

export default ApplicationChargeMiddleware
