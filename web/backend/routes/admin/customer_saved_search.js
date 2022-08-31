import Controller from '../../controller/customer_saved_search.js'

export default function CustomerSavedSearchRoute(app) {
  app.post('/api/customer_saved_searches', Controller.create) //tạo một customers saved search
  app.get('/api/customer_saved_searches', Controller.find)
  app.get('/api/customer_saved_searches/:id')
  app.get('/api/customer_saved_searches/:id/customers')
  app.get('/api/customer_saved_searches/count')
  app.put('/api/customer_saved_searches/:id')
  app.delete('/api/customer_saved_searches/:id')
}
