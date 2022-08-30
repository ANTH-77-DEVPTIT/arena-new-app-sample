import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import CustomerAddressMiddleware from '../middlewares/customer_address.js'

export default {
  create: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { customer_id } = req.params

      const data = await CustomerAddressMiddleware.create({
        shop,
        accessToken,
        customer_id,
        data: req.body,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id } = req.params

      const data = await CustomerAddressMiddleware.find({ shop, accessToken, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id, address_id } = req.params

      const data = await CustomerAddressMiddleware.findById({ shop, accessToken, id, address_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update_address: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id, address_id } = req.params

      const data = await CustomerAddressMiddleware.update_address({
        shop,
        accessToken,
        id,
        address_id,
        data: req.body,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update_default_address: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id, address_id } = req.params

      const data = await CustomerAddressMiddleware.update_default_address({
        shop,
        accessToken,
        id,
        address_id,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update_address_multi: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id } = req.params

      const data = await CustomerAddressMiddleware.update_address_multi({
        shop,
        accessToken,
        id,
        data: req.body,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id, address_id } = req.params

      const data = await CustomerAddressMiddleware.delete({ shop, accessToken, id, address_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
