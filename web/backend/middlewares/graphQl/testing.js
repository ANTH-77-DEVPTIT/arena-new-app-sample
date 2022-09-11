// import apiCaller from '../helpers/apiCaller.js'
// import validateParams from '../helpers/validateParams.js'
// import { Shopify } from '@shopify/shopify-api'
// import FormData from 'form-data'
// import fs from 'fs'
// import path from 'path'
// import axios from 'axios'
// import clipboardy from 'clipboardy'

// const create = async ({ shop, accessToken, file }) => {
//   try {
//     let client = new Shopify.Clients.Graphql(shop, accessToken)

//     // let fileExtension = file.filename.split('.').slice(-1)[0]
//     // let fileName = path.parse(file.path).name

//     console.time('fileCreate')

//     let fileCreateQuery = `
//       mutation fileCreate($files: [FileCreateInput!]!) {
//         fileCreate(files: $files) {
//           files {
//             ... on MediaImage{
//               id
//             }
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `
//     let fileCreateVariables = {
//       files: {
//         alt: '',
//         contentType: 'IMAGE',
//         originalSource: `${process.env.HOST}/assets/${file.filename}`,
//       },
//     }

//     let {
//       body: {
//         data: { fileCreate },
//       },
//     } = await client.query({
//       data: {
//         query: fileCreateQuery,
//         variables: fileCreateVariables,
//       },
//     })
//     console.timeEnd('fileCreate')

//     console.time('queryFile')

//     let findFileQuery = `
//       query FileStatusPoll($ids: [ID!]!) {
//         nodes(ids: $ids) {
//           ... on MediaImage {
//             fileStatus
//             image {
//               url
//             }
//           }
//         }
//       }
//     `
//     let findFileVariables = {
//       ids: [fileCreate.files[0].id],
//     }

//     let startTime = Date.now()
//     let mediaImageResponse = await (async function loop() {
//       if ((Date.now() - startTime) / 1000 > 60) return false
//       let response = await fileQueryRequest(findFileQuery, findFileVariables)
//       if (response.body.data.nodes.length) {
//         if (response.body.data.nodes[0].fileStatus == 'READY') {
//           return response.body.data.nodes[0]
//         }
//       }

//       return loop()
//     })()
//     console.timeEnd('queryFile')
//     console.log('------------------------')
//     return mediaImageResponse

//     function fileQueryRequest(query, variables) {
//       return client.query({
//         data: { query, variables },
//       })
//     }
//   } catch (error) {
//     throw error.message
//   }
// }

// const UploadFileMiddlewares = {
//   create,
// }

// export default UploadFileMiddlewares
