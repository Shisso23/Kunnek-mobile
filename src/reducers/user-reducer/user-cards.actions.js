import { creditCardService, flashService } from '../../services';
import { setCreditCardsLoadingAction, setUserCreditCardsAction } from './user.reducer';

export const getUserCreditCardsAction = () => async (dispatch) => {
  dispatch(setCreditCardsLoadingAction(true));
  try {
    const cards = await creditCardService.getCreditCards();
    dispatch(setUserCreditCardsAction(cards));
  } catch (error) {
    flashService.error('Could not load credit cards');
    // eslint-disable-next-line no-console
    console.warn(error.message);
  } finally {
    dispatch(setCreditCardsLoadingAction(false));
  }
};
