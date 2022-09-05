import verifyToken from './../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import ProductCollectMiddleware from '../middlewares/product_collect.js'

export default {
  create: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await ProductCollectMiddleware.create({
        shop,
        accessToken,
        data: req.body,
      })
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await ProductCollectMiddleware.find({ shop, accessToken, ...req.query })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { collect_id } = req.params

      const data = await ProductCollectMiddleware.findById({ shop, accessToken, collect_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  count: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await ProductCollectMiddleware.count({ shop, accessToken })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { collect_id } = req.params

      const data = await ProductCollectMiddleware.delete({ shop, accessToken, collect_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res)
    }
  },
}
