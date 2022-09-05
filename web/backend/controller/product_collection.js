import verifyToken from '../auth/verifyToken.js'
import ProductCollectionMiddleware from '../middlewares/product_collection.js'
import CustomCollectionMiddleware from '../middlewares/custom_collection.js'
import ResponseHandler from '../helpers/responseHandler.js'

export default {
  //collections
  find_single_collection: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { collection_id } = req.params

      const data = await ProductCollectionMiddleware.find_single_collection({
        shop,
        accessToken,
        collection_id,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find_products: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const { collection_id } = req.params

      const data = await ProductCollectionMiddleware.find_products({
        shop,
        accessToken,
        collection_id,
        ...req.query,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  //custom collections api
  create: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await CustomCollectionMiddleware.create({ shop, accessToken, data: req.body })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await CustomCollectionMiddleware.find({ shop, accessToken, ...req.query })

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

      const data = await CustomCollectionMiddleware.findById({
        shop,
        accessToken,
        id,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  count: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = CustomCollectionMiddleware.count({ shop, accessToken })

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

      const data = await CustomCollectionMiddleware.update({
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

      const { id } = req.params

      const data = await CustomCollectionMiddleware.delete({ shop, accessToken, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  //smart collections
}
