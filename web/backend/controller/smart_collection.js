import verifyToken from '../auth/verifyToken.js'
import SmartCollectionMiddleware from '../middlewares/smart_collection.js'
import ResponseHandler from '../helpers/responseHandler.js'

export default {
  create: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await SmartCollectionMiddleware.create({ shop, accessToken, data: req.body })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await SmartCollectionMiddleware.find({ shop, accessToken, ...req.query })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id } = req.params

      const data = await SmartCollectionMiddleware.findById({ shop, accessToken, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  count: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await SmartCollectionMiddleware.count({ shop, accessToken, id: req.query.id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { id } = req.params

      const data = await SmartCollectionMiddleware.update({ shop, accessToken, id, data: req.body })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  //order position product in smart collections
  update_order_product: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await SmartCollectionMiddleware.update_order_product({
        shop,
        accessToken,
        ...req.query,
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

      const { id } = req.params

      const data = await SmartCollectionMiddleware.delete({ shop, accessToken, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
