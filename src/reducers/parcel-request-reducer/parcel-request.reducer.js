import { getDefaultPaginationObject } from '../../helpers/pagination.helper';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'parcel-request';

const setParcelRequest = CreateAction(reducerName, 'SET_PARCEL_REQUEST');
export const setParcelRequestAction = setParcelRequest.action;

const setId = CreateAction(reducerName, 'SET_ID');
export const setIdAction = setId.action;

const setCollectAddress = CreateAction(reducerName, 'SET_COLLECT_ADDRESS');
export const setCollectAddressAction = setCollectAddress.action;

const setDeliverAddress = CreateAction(reducerName, 'SET_DELIVER_ADDRESS');
export const setDeliverAddressAction = setDeliverAddress.action;

const setItemName = CreateAction(reducerName, 'SET_ITEM_NAME');
export const setItemNameAction = setItemName.action;

const setDescription = CreateAction(reducerName, 'SET_DESCRIPTION');
export const setDescriptionAction = setDescription.action;

const setPrice = CreateAction(reducerName, 'SET_PRICE');
export const setPriceAction = setPrice.action;

const setDistance = CreateAction(reducerName, 'SET_DISTANCE');
export const setDistanceAction = setDistance.action;

const setItemWeight = CreateAction(reducerName, 'SET_ITEM_WEIGHT');
export const setItemWeightAction = setItemWeight.action;

const setItemHeight = CreateAction(reducerName, 'SET_ITEM_HEIGHT');
export const setItemHeightAction = setItemHeight.action;

const setItemWidth = CreateAction(reducerName, 'SET_ITEM_WIDTH');
export const setItemWidthAction = setItemWidth.action;

const setItemLength = CreateAction(reducerName, 'SET_ITEM_LENGTH');
export const setItemLengthAction = setItemLength.action;

const setPickupDateTime = CreateAction(reducerName, 'SET_PICKUP_DATE_TIME');
export const pickupDateTimeAction = setPickupDateTime.action;

const setLatestDeliveryDateTime = CreateAction(reducerName, 'SET_LATEST_DELIVERY_DATE_TIME');
export const setLatestDeliveryDateTimeAction = setLatestDeliveryDateTime.action;

const setLocations = CreateAction(reducerName, 'SET_LOCATIONS');
export const setLocationsAction = setLocations.action;

const setServiceFee = CreateAction(reducerName, 'SET_SERVICE_FEE');
export const setServiceFeeAction = setServiceFee.action;

const setPagination = CreateAction(reducerName, 'SET_PAGINATION');
export const setPaginationAction = setPagination.action;

const initialState = {
  parcelRequest: undefined,
  id: undefined,
  collectAddress: '',
  deliverAddress: '',
  itemName: '',
  description: '',
  price: 0.0,
  distance: 0,
  itemWeight: 0.0,
  itemHeight: 0.0,
  itemWidth: 0.0,
  itemLength: 0.0,
  pickupDateTime: undefined,
  latestDeliveryDateTime: undefined,
  locations: [],
  serviceFee: 0,
  pagination: getDefaultPaginationObject(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setParcelRequest.actionType:
      return {
        ...state,
        parcelRequest: action.payload,
      };
    case setId.actionType:
      return {
        ...state,
        id: action.payload,
      };
    case setCollectAddress.actionType:
      return {
        ...state,
        collectAddress: action.payload,
      };
    case setDeliverAddress.actionType:
      return {
        ...state,
        deliverAddress: action.payload,
      };
    case setItemName.actionType:
      return {
        ...state,
        itemName: action.payload,
      };
    case setDescription.actionType:
      return {
        ...state,
        description: action.payload,
      };
    case setPrice.actionType:
      return {
        ...state,
        price: action.payload,
      };
    case setDistance.actionType:
      return {
        ...state,
        distance: action.payload,
      };
    case setItemWeight.actionType:
      return {
        ...state,
        itemWeight: action.payload,
      };
    case setItemHeight.actionType:
      return {
        ...state,
        itemHeight: action.payload,
      };
    case setItemWidth.actionType:
      return {
        ...state,
        itemWidth: action.payload,
      };
    case setItemLength.actionType:
      return {
        ...state,
        itemLength: action.payload,
      };
    case setPickupDateTime.actionType:
      return {
        ...state,
        pickupDateTime: action.payload,
      };
    case setLatestDeliveryDateTime.actionType:
      return {
        ...state,
        latestDeliveryDateTime: action.payload,
      };
    case setLocations.actionType:
      return {
        ...state,
        locations: action.payload,
      };
    case setServiceFee.actionType:
      return {
        ...state,
        serviceFee: action.payload,
      };
    default:
      return state;
  }
};
