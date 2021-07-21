import _ from 'lodash';
import { Colors } from '../theme/Variables';

export const getCurrency = () => 'R';

export const PAYMENT_STATUSES = {
  pending: 'pending',
  reversed: 'reversed',
  completed: 'completed',
  failed: 'failed',
};

export const getTransactionTypeColour = (item) => {
  const status = _.get(item, 'status', 'pending');
  switch (status) {
    case 'pending':
      return Colors.primary;
    case 'authorized':
      return Colors.darkTangerine;
    case 'reversed':
      return Colors.darkGreen;
    case 'paid':
      return Colors.darkGreen;
    case 'failed':
      return Colors.error;
    case 'paid_out':
      return Colors.darkGreen;
    default:
      return Colors.primary;
  }
};
