import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const create_blog = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({ shop, accessToken, data, method: 'POST', endpoint: `blogs.json` })
  } catch (error) {
    throw error
  }
}

const create_article = async ({ shop, accessToken, data, id }) => {
  try {
    validateParams({ shop, accessToken, data, id })

    return await apiCaller({
      shop,
      accessToken,
      data,
      method: 'POST',
      endpoint: `blogs/${id}/articles.json`,
    })
  } catch (error) {
    throw error
  }
}

const create_comment = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({ shop, accessToken, data, method: 'POST', endpoint: `comments.json` })
  } catch (error) {
    throw error
  }
}

const create_page = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken, data })

    return await apiCaller({ shop, accessToken, data, method: 'POST', endpoint: `pages.json` })
  } catch (error) {
    throw error
  }
}

const BlogMiddleware = {
  create_blog,
  create_article,
  create_comment,
  create_page,
}

export default BlogMiddleware
