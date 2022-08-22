import apiCaller from '../helpers/apiCaller'

const count = async () => {
  return await apiCaller(`/api/products/count`)
}

const find = async () => {
  return await apiCaller(`/api/products`)
}

const create = async (data) => {
  const formData = new FormData()

  Object.keys(data)
    .filter((name) => !['images'].includes(name))
    .forEach((name) => formData.append(name, data[name]))

  if (data['images']?.length) {
    data['images'].forEach((item) => formData.append('images', item))
  }

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