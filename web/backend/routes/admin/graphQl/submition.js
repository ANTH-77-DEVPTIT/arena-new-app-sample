import Controller from '../../../controller/submition_graphQl.js'

export default function submitionGraphQLRoute(app) {
  app.get('/api/submition_graphQL', Controller.submit)
}
