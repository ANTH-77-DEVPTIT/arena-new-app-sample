import Controller from '../../controller/product_image.js'
import MulterUpload from '../../connector/multer/index.js'

export default function productImageRoute(app) {
  app.get('/api/products/:product_id/images/count', Controller.count)
  app.get('/api/products/:product_id/images', Controller.find)
  app.get(`/api/products/:product_id/images/:image_id`, Controller.findById)
  app.post(`/api/upload`, MulterUpload.array('images', 250), Controller.create)
  app.put(
    `/api/products/:product_id/images/:image_id`,
    MulterUpload.array('images', 250),
    Controller.update,
  )
  app.delete(`api/products/:product_id/images/:image_id`, Controller.delete)
}
