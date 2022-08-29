import Controller from '../../controller/customer.js'
import MulterUpload from '../../connector/multer/index.js'

export default function customerRoute(app) {
  app.get('/api/customers/count', Controller.count)
  app.get('/api/customers', Controller.find)
  app.get('/api/customers/:id', Controller.findById)
  app.post('/api/customers', MulterUpload.array('images', 250), Controller.create)
  app.put('/api/customers/:id', MulterUpload.array('images', 250), Controller.update)
  app.get('/api/customers/search', Controller.search)
}
