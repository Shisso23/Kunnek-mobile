import { PAYMENT_TYPES } from '../services/sub-services/payment-service/payment.service';

export const getCurrency = () => 'R';

export const PAYMENT_STATUSES = {
  pending: 'pending',
  reversed: 'reversed',
  completed: 'completed',
  failed: 'failed',
};

// export const openVerificationPaymentScreen = (card) => {
//   Actions.push(PaymentScene.key, {
//     message: `We will make a charge of ${getCurrency()}1.00 on your credit card to verify that your card number and details are correct. This charge will be reversed once successful.`,
//     totalAmount: 1,
//     paymentType: PAYMENT_TYPES.verification,
//     card,
//   });
// };
