import Controller from '../../controller/product_collect.js'

export default function productCollectRoute(app) {
  app.post('/api/collects', Controller.create)
  app.get('api/collects', Controller.find)
  app.get('/api/collects/:id', Controller.findById)
  app.get('api/collects/count', Controller.count)
  app.delete('/api/collects/:id', Controller.delete)
}
