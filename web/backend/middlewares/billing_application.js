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
      endpoint: `recurring_application_charges.json`,
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
      endpoint: `recurring_application_charges/${id}.json`,
    })
  } catch (error) {
    throw error
  }
}

//application Credits
const create_application_credit = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({
      shop,
      accessToken,
      method: 'POST',
      data,
      endpoint: `application_credits.json`,
    })
  } catch (error) {
    throw error
  }
}

const create_recurring_app_charge = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `recurring_application_charges.json`,
    })
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
      method: 'DELETE',
      endpoint: `recurring_application_charges/${id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const create_usage_charge = async ({ shop, accessToken, id, data }) => {
  try {
    validateParams({ shop, accessToken, id, data })

    return await apiCaller({
      shop,
      accessToken,
      method: 'POST',
      data,
      endpoint: `recurring_application_charges/${id}/usage_charges.json`,
    })
  } catch (error) {
    throw error
  }
}

const ApplicationChargeMiddleware = {
  create,
  find,
  findById,
  create_application_credit,
  create_recurring_app_charge,
  delete: _delete,
  create_usage_charge,
}

export default ApplicationChargeMiddleware
