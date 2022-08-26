import { Shopify } from '@shopify/shopify-api'

// mã session này xác thực yêu cầu được nhúng vào từ phía clients của your app.
export default async function verifyToken(req, res) {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res, false)
    if (!session?.shop) {
      throw new Error('Unauthorized')
    }
    return session
  } catch (error) {
    throw new Error('Unauthorized')
  }
}
