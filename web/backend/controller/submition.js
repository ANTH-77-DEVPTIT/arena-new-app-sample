import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import ProductMiddleware from '../middlewares/product.js'
import CustomerMiddleware from '../middlewares/customer.js'
import CustomerAddressMiddleware from '../middlewares/customer_address.js'
import CustomerSavedSearchMiddleware from '../middlewares/customer_saved_search.js'
import ProductCollectMiddleware from '../middlewares/product_collect.js'
import ProductCollectionMiddleware from '../middlewares/product_collection.js'
import CustomCollectionMiddleware from '../middlewares/custom_collection.js'
import SmartCollectionMiddleware from '../middlewares/smart_collection.js'
import OrderMiddleware from '../middlewares/order/order.js'
import MetafieldMiddleware from '../middlewares/metafield.js'
import ApplicationChargeMiddleware from '../middlewares/application_charge.js'

export default {
  submit: async (req, res) => {
    console.log('----------------------------------------')
    console.log('/api/submition')
    console.log('----------------------------------------')
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      // let data = null

      /**
       * Duplicator export
       */
      // req.body = {
      //   resources: [
      //     { type: 'product', count: '10' },
      //     { type: 'custom_collection', count: '10' },
      //     { type: 'smart_collection', count: '10' },
      //   ],
      // }

      // data = await BullmqBackgroundJobMiddleware.create('duplicator_export', {
      //   ...req.body,
      //   shop,
      // })

      /**
       * Duplicator import
       */
      // req.body = {
      //   uuid: 'fb764dbf-0ca6-40fe-92fa-6724fcc712ae',
      //   package: 9,
      // }

      // data = await BullmqBackgroundJobMiddleware.create('duplicator_import', {
      //   ...req.body,
      //   shop,
      // })

      // const result = {
      //   customer: {
      //     accepts_marketing: false,
      //     accepts_marketing_updated_at: '2022-08-30T16:07:51+07:00',
      //     addresses: [],
      //     admin_graphql_api_id: 'gid://shopify/Customer/6411989844222',
      //     created_at: '2022-08-30T15:51:18+07:00',
      //     currency: 'VND',
      //     email: 'hihichangehihid@email.address.com',
      //     first_name: null,
      //     // id: 6411989844222,
      //     last_name: null,
      //     last_order_id: null,
      //     last_order_name: null,
      //     marketing_opt_in_level: null,
      //     multipass_identifier: null,
      //     note: 'Customer is a great guy',
      //     orders_count: 0,
      //     phone: null,
      //     sms_marketing_consent: null,
      //     state: 'disabled',
      //     tags: '',
      //     tax_exempt: false,
      //   },
      // }

      // console.log('/api/submition data :>> ', data)

      // let result = {
      //   customer_invite: {
      //     to: 'steteve.lastnameson@example.com',
      //     from: 'abeltruong.arena@gmail.com',
      //     bcc: [],
      //     subject: 'Welcome to my new shop',
      //     custom_message: 'My awesome new store',
      //   },
      // }

      // let customer_id = 6411989844222
      // let id = 7938432598270
      // const result =
      //   '{"customer_saved_search":{"name":"Spent more than $50","query":"total_spent:>50"}}'

      // let query =
      //   'country:Vietnam email:abeltruong@gmail.com verified_email:true&fields=first_name,email,id,last_name,addresses'

      // let result =
      //   '{"address":{"address1":"binh duong, binh dinh, viet nam","address2":"Suite 1234","city":"Montreal","company":"Fancy Co.","first_name":"Samuel","last_name":"de Champlain","phone":"819-444-5555","province":"Quebec","country":"Canada","zip":"G1R 4P5","name":"Samuel de Champlain","province_code":"QC","country_code":"CA","country_name":"Canada"}}'

      // let query = 'Vietnam&fields=first_name,email,id'

      // let result = {
      //   custom_collection: {
      //     title: 'collection 1 nhoeee!!',
      //     published: true,
      //     body_html: '<p>5000 songs in your pocket</p>',
      //     // image: {
      //     //   src: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
      //     //   alt: 'Anh ne la image nha!!',
      //     // },
      //     image: '',
      //     // collects: [
      //     //   { product_id: 921728736, position: 1 },
      //     //   { product_id: 455204334, position: 2 },
      //     // ],
      //   },
      // }

      // let result = {
      //   smart_collection: {
      //     title: 'My Girl nha!',
      //     body_html: '<p>5000 songs in your pocket nhoa!</p>',
      //     rules: [{ column: 'title', relation: 'contains', condition: 'nhum' }],
      //   },
      // }

      // let productIDs = '7834751664382,7847646822654,7834766737662,7834417856766,7834417463550'

      // const data = await SmartCollectionMiddleware.findById({
      //   shop,
      //   accessToken,
      //   // since_id: 401711268094,
      //   // product_id: 7815317356798,
      //   // ids: '401711563006,401710678270,400695492862',
      //   // customer_id,
      //   id: 401690099966,
      // })

      // const data = await SmartCollectionMiddleware.update_order_product({
      //   shop,
      //   accessToken,
      //   // since_id: 401711268094,
      //   // product_id: 7815317356798,
      //   // ids: '401711563006,401710678270,400695492862',
      //   // customer_id,
      //   id: 401690099966,
      //   productIDs,
      //   data: {},
      //   // data: JSON.parse(result),
      //   // data: result,
      //   // query,
      //   // data: result,
      //   // limit: 1,
      // })

      // let result = {
      //   order: {
      //     note: 'san pham nhieu sua it duong!!',
      //     note_attributes: [
      //       {
      //         name: 'color',
      //         value: 'white',
      //       },
      //     ],
      //     phone: '+15145556677',
      //     buyer_accepts_marketing: true,
      //     line_items: [
      //       {
      //         title: 'duong thuong dau',
      //         grams: 1200,
      //         price: 1200,
      //         variant_id: 43380747141374,
      //         quantity: 3,
      //       },
      //     ],
      //     email: 'buyer@gmail.com',
      //     status: 'fulfilled',
      //     fulfillment_status: 'fulfilled',
      //     transactions: [
      //       {
      //         kind: 'sale',
      //         status: 'success',
      //         amount: 12332,
      //       },
      //     ],
      //   },
      // }

      // const data = await OrderMiddleware.re_open_order({
      //   shop,
      //   accessToken,
      //   data: {},
      //   id: 4908515328254,
      // })

      // let result = {
      //   metafield: {
      //     // id: 23071365857534,
      //     namespace: 'khoiluong',
      //     key: 'special',
      //     type: 'number_integer',
      //     value: 123123,
      //   },
      // }

      // const data = await MetafieldMiddleware.create({
      //   shop,
      //   accessToken,
      //   resource: 'products/7834737737982/',
      //   data: result,
      //   // metafield_id: 23071365857534,
      // })

      // const data = await MetafieldMiddleware.create({
      //   shop,
      //   accessToken,
      //   resource: 'products/7834737737982/',
      //   data: result,
      //   // metafield_id: 23071365857534,
      // })

      let result = {
        application_charge: {
          name: 'tien dich vu du lich',
          price: 2,
          return_url: 'http://super-duper.shopifyapps.com',
          test: true,
        },
      }

      const data = await ApplicationChargeMiddleware.findById({ shop, accessToken, id: 2926313726 })

      return ResponseHandler.success(res, data)
    } catch (error) {
      console.log('/api/submition error :>> ', error.message)
      return ResponseHandler.error(res, error)
    }
  },
}
