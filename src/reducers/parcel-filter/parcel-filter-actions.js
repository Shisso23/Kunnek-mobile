import { filterParcelsAction } from './parcel-filter-reducer';

export const dispatchParcels = (response) => (dispatch) => {
  dispatch(filterParcelsAction(response));
};
