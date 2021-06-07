import CreateAction from '../action-utilities/action-creator';

const reducerName = 'tracking';

const setIsLoading = new CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setPoints = new CreateAction(reducerName, 'SET_POINTS');
export const setPointsAction = setPoints.action;

const setCurrentRoutePoints = new CreateAction(reducerName, 'SET_CURRENT_ROUTE_POINTS');
export const setCurrentRoutePointsAction = setCurrentRoutePoints.action;

const setCurrentLocation = new CreateAction(reducerName, 'SET_CURRENT_LOCATION');
export const setCurrentLocationAction = setCurrentLocation.action;

const setGooglePlacesAutocompleteData = new CreateAction(
  reducerName,
  'SET_GOOGLE_PLACES_AUTOCOMPLETE_DATA',
);
export const setGooglePlacesAutocompleteDataAction = setGooglePlacesAutocompleteData.action;

const initialState = {
  isLoading: false,
  points: [],
  currentRoutePoints: [],
  currentLocation: {},
  googlePlacesAutocompleteData: {},
};

export default function mapsReducer(state = initialState, action) {
  switch (action.type) {
    case setIsLoading.actionType:
      return { ...state, isLoading: action.payload };
    case setPoints.actionType:
      return { ...state, points: action.payload };
    case setCurrentRoutePoints.actionType:
      return { ...state, currentRoutePoints: action.payload };
    case setCurrentLocation.actionType:
      return { ...state, currentLocation: action.payload };
    case setGooglePlacesAutocompleteData.actionType:
      return { ...state, googlePlacesAutocompleteData: action.payload };
    default:
      return state;
  }
}
