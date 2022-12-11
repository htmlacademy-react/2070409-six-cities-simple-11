import AuthorizationStatus from '../const/authorizationStatus';
import { State } from '../types/reduxTypes';

//type Selector = (state: State) => Partial<State>;

export const locationNameSelector = (state: State) => state.locationName;
export const currentCityOffersListSelector = (state: State) => state.currentCityOffersList;
export const activeOfferIdSelector = (state: State) => state.activeOfferId;
export const currentCityLocationSelector = (state: State) => state.currentCityLocation;
export const commentsListSelector = (state: State) => state.propertyData.commentsList;
export const offersListSelector = (state: State) => state.propertyData.offersList;
export const isDataLoadedSelector = (state: State) => state.isDataLoaded;
export const authorizationStatusSelector = (state: State) => state.authorizationStatus === AuthorizationStatus.Auth;
export const userDataSelector = (state: State) => state.userData;
export const currentOfferSelector = (state: State) => state.currentOffer;
export const nearbyOffersSelector = (state: State) => state.nearbyOffers;

