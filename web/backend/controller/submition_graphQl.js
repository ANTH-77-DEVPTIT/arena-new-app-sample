import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import GraphQlMiddleware from '../middlewares/graphQl/products.js'

export default {
  submit: async (req, res) => {
    console.log('----------------------------------------')
    console.log('/api/submition')
    console.log(' GraphQl nhe! ')
    console.log('----------------------------------------')
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      let result = `{
        Glasses: product(id: "gid://shopify/Product/7826121556222") {
          ...productInformation
        }
        Guitar: product(id: "gid://shopify/Product/7834737737982") {
          ...productInformation
        }
      }
        fragment productInformation on Product {
          title
          description
        }
      `

      const data = await GraphQlMiddleware.graphQl({ shop, accessToken, query: result })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
