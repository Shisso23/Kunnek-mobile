import CreateAction from '../action-utilities/action-creator';

const reducerName = 'trip';

const setTripLoading = CreateAction(reducerName, 'SET_TRIP_LOADING');
export const setTripLoadingAction = setTripLoading.action;

const setTrip = CreateAction(reducerName, 'SET_TRIP');
export const setTripAction = setTrip.action;

const setTrips = CreateAction(reducerName, 'SET_TRIPS');
export const setTripsAction = setTrips.action;

const initialState = {
  tripLoading: false,
  trip: undefined,
  trips: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setTripLoading.actionType:
      return {
        ...state,
        tripLoading: action.payload,
      };
    case setTrip.actionType:
      return {
        ...state,
        trip: action.payload,
      };
    case setTrips.actionType:
      return {
        ...state,
        trips: action.payload,
      };
    default:
      return state;
  }
};
