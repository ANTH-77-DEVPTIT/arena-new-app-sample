const getBase64 = (file) => {
  // return new Promise((resolve) => {
  //   let imageBase64 = ''
  //   var reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onload = function () {
  //     // console.log(reader.result)
  //     imageBase64 = reader.result
  //   }
  //   reader.onerror = function (error) {
  //     console.log('Error: ', error)
  //   }

  //   console.log('🚀 ~ file: getBase64.js ~ line 15 ~ returnnewPromise ~ imageBase64', imageBase64)
  //   resolve(imageBase64)
  // })
  // return new Promise((resolve) => {
  //   let fileInfo
  //   let baseURL = ''
  //   // Make new FileReader
  //   let reader = new FileReader()

  //   // Convert the file to base64 text
  //   reader.readAsDataURL(file)

  //   // on reader load somthing...
  //   reader.onload = () => {
  //     // Make a fileInfo Object
  //     console.log('Called', reader)
  //     baseURL = reader.result
  //     console.log(baseURL)
  //     resolve(baseURL)
  //   }
  //   console.log(fileInfo)
  // })
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    return reader.result
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}

export default getBase64
