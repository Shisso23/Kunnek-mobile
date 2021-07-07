import { combineReducers } from 'redux';

import appReducer from './app-reducer/app.reducer';
import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import parcelRequestReducer from './parcel-request-reducer/parcel-request.reducer';
import tripReducer from './trip-reducer/trip.reducer';
import paymentReducer from './payment-reducer/payment.reducer';
import mapsReducer from './maps-reducer/maps.reducer';

export default combineReducers({
  appReducer,
  userAuthReducer,
  userReducer,
  parcelRequestReducer,
  tripReducer,
  paymentReducer,
  mapsReducer,
});
