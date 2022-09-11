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

      let result = `query {
        product(id: "gid://shopify/Product/7824038494462") {
          title
          variants(first: 10) {
            edges {
              node {
                selectedOptions {
                  name
                  value
                }
                media(first: 10) {
                  edges {
                    node {
                      alt
                      mediaContentType
                      status
                      __typename
                      ... on MediaImage {
                        id
                        preview {
                          image {
                            originalSrc
                          }
                        }
                        __typename
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`
      const data = await GraphQlMiddleware.graphQl({ shop, accessToken, query: result })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
