// Mock payment gateway integration. In production this file is the ONLY
// place that should change to plug in a real gateway (Razorpay/Stripe/etc):
// createOrder() would call your backend to create a server-side order, and
// verifyPayment() would call your backend to verify the signature/webhook.
// UI components never talk to a gateway directly.

const NETWORK_DELAY_MS = 900

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS))
}

export function createOrder({ courseId, amount }) {
  return delay({
    orderId: `order_${courseId}_${Date.now()}`,
    amount,
    currency: 'INR',
  })
}

// Simulates a payment attempt. In this mock, payments succeed unless the
// card number field ends in "0000" — that's purely a way to demo the
// failure/retry flow in the UI without a real gateway.
export function processPayment({ orderId, cardNumber, expiry, cvv, upiId, bank }) {
  const willFail = cardNumber?.trim().endsWith('0000')

  return delay({
    success: !willFail,
    transactionId: willFail ? null : `txn_${orderId}_${Math.floor(Math.random() * 100000)}`,
    orderId,
  })
}
