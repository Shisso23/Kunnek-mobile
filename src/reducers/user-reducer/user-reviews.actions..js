import { flashService, reviewService } from '../../services';
import { setUserReviewsAction, setReviewsLoadingAction } from './user.reducer';

export const getUserReviewsAction = () => async (dispatch) => {
  dispatch(setReviewsLoadingAction(true));
  try {
    const reviews = await reviewService.getReviews();
    dispatch(setUserReviewsAction(reviews));
  } catch (error) {
    flashService.error('Could not load reviews');
    // eslint-disable-next-line no-console
    console.warn(error.message);
  } finally {
    dispatch(setReviewsLoadingAction(false));
  }
};
