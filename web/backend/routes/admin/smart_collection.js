import Controller from '../../controller/smart_collection.js'

export default function smartCollectionRoute(app) {
  app.post('/api/smart_collections', Controller.create)
  app.get('/api/smart_collections', Controller.find)
  app.get('/api/smart_collections/:id', Controller.findById)
  app.get('/api/smart_collections/count', Controller.count)
  app.put('/api/smart_collections/:id', Controller.update)
  app.put('/api/smart_collections/:id/order', Controller.update_order_product)
  app.delete('/api/smart_collections/:id', Controller.delete)
}
