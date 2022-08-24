import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import ProductImageMiddleware from '../middlewares/product_image.js'

export default {
  count: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { product_id } = req.params

      const data = await ProductImageMiddleware.count({ shop, accessToken, product_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { product_id } = req.params

      const data = await ProductImageMiddleware.count({ shop, accessToken, product_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { product_id, image_id } = req.params
      const data = await ProductImageMiddleware.count({ shop, accessToken, product_id, image_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  create: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await ProductImageMiddleware.create({
        shop,
        accessToken,
        data: req.files,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { product_id, image_id } = req.params

      const data = await ProductImageMiddleware.update({
        shop,
        accessToken,
        product_id,
        image_id,
        data: req.body,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { product_id, image_id } = req.params

      const data = await ProductImageMiddleware.delete({ shop, accessToken, product_id, image_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
