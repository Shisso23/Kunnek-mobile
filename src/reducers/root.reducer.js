import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import parcelRequestReducer from './parcel-request-reducer/parcel-request.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
  parcelRequestReducer,
});
