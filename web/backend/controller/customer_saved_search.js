import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import CustomerSavedSearchMiddleware from '../middlewares/customer_saved_search.js'

export default {
  create: async (req, res) => {
    try {
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await CustomerSavedSearchMiddleware.create({
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
      const session = verifyToken(req, res)
      const { shop, accessToken } = session

      const data = await CustomerSavedSearchMiddleware.find({ shop, accessToken })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
