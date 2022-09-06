import Controller from './../../controller/product_collection.js'

export default function productCollectionRoute(app) {
  //collections Routes
  app.get('/api/collections/:id', Controller.find_single_collection)
  app.get('/api/collections/:id/products', Controller.find_products)

  //custom collections Routes
  app.post('/api/custom_collections', Controller.create)
  app.get('/api/custom_collections', Controller.find)
  app.get('/api/custom_collections/:id', Controller.findById)
  app.get('/api/custom_collections/count', Controller.count)
  app.put('/api/custom_collections/:id', Controller.update)
  app.delete('/api/custom_collections/:id', Controller.delete)
}
