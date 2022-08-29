// import Controller from '../../controller/order.js'
import MulterUpload from '../../connector/multer/index.js'

export default function orderRoute(app) {
  app.get('/api/orders/count')
  app.get('/api/orders')
  app.get('/api/orders/:id')
  app.post('/api/orders', MulterUpload.array('images', 250))
  app.put('/api/orders/:id', MulterUpload.array('images', 250))
  app.delete('/api/orders/:id')
}
