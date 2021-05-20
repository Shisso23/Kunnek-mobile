import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import parcelRequestReducer from './parcel-request-reducer/parcel-request.reducer';
import tripReducer from './trip-reducer/trip.reducer';
import paymentReducer from './payment-reducer/payment.reducer';
import mapsReducer from './maps-reducer/maps.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
  parcelRequestReducer,
  tripReducer,
  paymentReducer,
  mapsReducer,
});
