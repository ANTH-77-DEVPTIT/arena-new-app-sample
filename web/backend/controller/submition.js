import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import ProductMiddleware from '../middlewares/product.js'
import CustomerMiddleware from '../middlewares/customer.js'
import CustomerAddressMiddleware from '../middlewares/customer_address.js'

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

      let id = 6411989844222
      let address_id = 7938433450238

      let result =
        '{"address":{"address1":"binh duong, binh dinh, viet nam","address2":"Suite 1234","city":"Montreal","company":"Fancy Co.","first_name":"Samuel","last_name":"de Champlain","phone":"819-444-5555","province":"Quebec","country":"Canada","zip":"G1R 4P5","name":"Samuel de Champlain","province_code":"QC","country_code":"CA","country_name":"Canada"}}'

      // let query = 'Vietnam&fields=first_name,email,id'

      const data = await CustomerAddressMiddleware.update_default_address({
        shop,
        accessToken,
        id,
        address_id,
        // data: JSON.parse(result),
        // data: result,
        // query,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      console.log('/api/submition error :>> ', error.message)
      return ResponseHandler.error(res, error)
    }
  },
}
