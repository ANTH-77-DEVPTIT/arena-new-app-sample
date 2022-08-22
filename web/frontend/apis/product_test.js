import apiCaller from '../helpers/apiCaller'

const count = async () => {
  return await apiCaller(`/api/products/count`)
}

const find = async () => {
  return await apiCaller(`/api/products`)
}

const create = async (data) => {
  return await apiCaller(`/api/products`, 'POST', { product: data })
}

const update = async (id, data) => {
  return await apiCaller(`/api/products/${id}`, 'PUT', { product: data })
}

const _delete = async (id) => {
  return await apiCaller(`/api/products/${id}`, 'DELETE')
}

const ProductApi = {
  count,
  find,
  create,
  update,
  delete: _delete,
}

export default ProductApi
