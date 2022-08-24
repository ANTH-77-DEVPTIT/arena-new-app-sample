import Controller from './../../controller/product.js'
import MulterUpload from '../../connector/multer/index.js'

export default function productRoute(app) {
  app.get('/api/products/count', Controller.count)
  app.get('/api/products', Controller.find)
  app.get('/api/products/:id', Controller.findById)
  app.post('/api/products', MulterUpload.none(), Controller.create)
  app.put('/api/products/:id', MulterUpload.none(), Controller.update)
  app.delete('/api/products/:id', Controller.delete)
}
