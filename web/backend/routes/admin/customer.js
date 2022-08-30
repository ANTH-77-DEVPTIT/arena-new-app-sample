import Controller from '../../controller/customer.js'

export default function customerRoute(app) {
  app.get('/api/customers/count', Controller.count)
  app.get('/api/customers', Controller.find)
  app.get('/api/customers/:id', Controller.findById)
  app.post('/api/customers', Controller.create)
  app.put('/api/customers/:id', Controller.update)
  app.get('/api/customers/search', Controller.search)
  app.post('/api/customers/:id/account_activation_url', Controller.account_activation_url) // Tạo URL kích hoạt tài khoản cho khách hàng.
  app.post('/api/customers/:id/send_invite', Controller.send_invite) //gửi lời mời tài khoản đến khách hàng.
  app.get('/api/customers/orders', Controller.customers_order) //truy xuất tất cả các đơn đạt hàng của khách hàng. Chỉ những đơn hàng đang open thì mới được trả lại.
}
