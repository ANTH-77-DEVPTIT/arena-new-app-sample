import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const getAll = async ({ shop, accessToken, count }) => {
  try {
    validateParams({ shop, accessToken })

    let items = []
    let res = null
    let hasNextPage = true
    let nextPageInfo = ''

    while (hasNextPage) {
      res = await apiCaller({
        shop,
        accessToken,
        endpoint: `products.json?limit=100&page_info=${nextPageInfo}`,
        pageInfo: true,
      })

      items = items.concat(res.products)

      hasNextPage = res.pageInfo.hasNext
      nextPageInfo = res.pageInfo.nextPageInfo

      if (!isNaN(count) && parseInt(count) && items.length >= parseInt(count)) {
        hasNextPage = false
        nextPageInfo = ''

        items = items.slice(0, count)
      }
    }

    return items
  } catch (error) {
    throw error
  }
}

const count = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({ shop, accessToken, endpoint: `products/count.json` })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, limit, pageInfo, order }) => {
  try {
    validateParams({ shop, accessToken })

    let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 20) : 20

    let endpoint = `products.json?limit=${_limit}`
    if (pageInfo) {
      endpoint += `&page_info=${pageInfo}`
    } else {
      if (order) {
        endpoint += `&order=${order}`
      } else {
        endpoint += `&order=updated_at+desc`
      }
    }

    return await apiCaller({
      shop,
      accessToken,
      endpoint,
      pageInfo: true,
    })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({ shop, accessToken, endpoint: `products/${id}.json` })
  } catch (error) {
    throw error
  }
}

const create = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })
    //cho nay de test nha!!!
    // console.log('???? ~ file: product.js ~ line 91 ~ create ~ data', data)

    // console.log('data.images :>> ', data.images)

    // //handle Image upload files
    // let images = []
    // if (files) {
    //   for (let i = 0; i < files.length; i++) {
    //     images.push({
    //       attachment: files[i].buffer?.toString('base64'),
    //     })
    //   }
    // }
    // //handle image upload url hihi
    // if (data.imagesURL) {
    //   images.push({
    //     src: data.imagesURL,
    //   })
    //   delete data.imagesURL
    // }

    // console.log('data :>> ', data.title)
    // console.log('data :>> ', data.options.split(','))
    // console.log('data :>> ', data.variants.split(','))
    // data = { product: { ...data, images: images } }

    return await apiCaller({ shop, accessToken, endpoint: `products.json`, method: 'POST', data })
  } catch (error) {
    throw error
  }
}

const update = async ({ shop, accessToken, id, data }) => {
  console.log('???? ~ file: product.js ~ line 124 ~ update ~ id', id)
  try {
    validateParams({ shop, accessToken, id, data })

    console.log('data', data)

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `products/${id}.json`,
      method: 'PUT',
      data,
    })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken, id })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `products/${id}.json`,
      method: 'DELETE',
    })
  } catch (error) {
    throw error
  }
}

const ProductMiddleware = {
  getAll,
  count,
  find,
  findById,
  create,
  update,
  delete: _delete,
}

export default ProductMiddleware
