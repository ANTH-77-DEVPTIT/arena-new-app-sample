import Controller from '../../controller/customer_address.js'

export default function customerAddressRoute(app) {
  //tạo một address mới cho customers
  app.post('/api/customer/:id/addresses', Controller.create)
  //truy xuất ra addresses của customers
  app.get('/api/customer/:id/addresses', Controller.find)
  //truy xuất một address chi tiết cho một customers
  app.get('/api/customer/:id/addresses/:address_id', Controller.findById)
  //update địa chỉ khách hàng đã tồn tại
  app.put('/api/customer/:id/addresses/:address_id', Controller.update_address)
  //giá địa chỉ mặc định cho khách hàng
  app.put('/api/customer/:id/addresses/:address_id/default', Controller.update_default_address)
  //thực hiện các hành động hàng loạt cho các địa chỉ khách hàng.
  app.put('/api/customer/:id/addresses/multi', Controller.update_address_multi)
  //xóa địa chỉ của danh sách địa chỉ của khách hàng
  app.delete('/api/customer/:id/addresses', Controller.delete)
}
