/**
 *
 * @param {Object} data
 */
//cái kiểm tra xác thực này là coi các fields như shop, accessToken hay endpoint, ... có giá trị hay không
//nếu các fields này không có giá trị thì báo lỗi ngay
const validateParams = (data) => {
  try {
    let keys = Object.keys(data)
    for (let i = 0, leng = keys.length; i < leng; i++) {
      if (!data[keys[i]]) {
        throw { message: `Bad request. Field ${keys[i]} is required`, field: keys[i] }
      }
    }
  } catch (error) {
    throw error
  }
}

export default validateParams
