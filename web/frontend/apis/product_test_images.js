import apiCaller from '../helpers/apiCaller'

const count = async (product_id) => {
  return await apiCaller(`/api/products/${product_id}/images/count`, { product_id: product_id })
}

const find = async (product_id) => {
  return await apiCaller(`/api/products/${product_id}/images`, { product_id: product_id })
}

const findById = async (product_id, image_id) => {
  return await apiCaller(`/api/products/${product_id}/images/${image_id}`)
}

const create = async (images) => {
  console.log('🚀 ~ images upload', images)
  const formData = new FormData()

  images.forEach((item) => formData.append('images', item))

  return await apiCaller(`/api/upload`, 'POST', formData)
}

const update = async (product_id, image_id, data) => {
  // return await apiCaller(`/api/products/${product_id}/images/${image_id}`, 'PUT', data)
}

const _delete = async (product_id, image_id) => {
  return await apiCaller(`/api/products/${product_id}/images/${image_id}`, 'DELETE', {
    product_id: product_id,
  })
}

const ProductImageApi = {
  count,
  find,
  findById,
  create,
  update,
  delete: _delete,
}

export default ProductImageApi
