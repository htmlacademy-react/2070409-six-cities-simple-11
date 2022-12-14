import { createSlice } from '@reduxjs/toolkit';
import AuthorizationStatus from '../../const/authorizationStatus';
import { ReducerNameSpaces } from '../../const/reducer-name-spaces';
import { UserData } from '../../types/apiTypes';
import { checkAuthAction, loginAction, logoutAction } from '../apiActions';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData;
}

export const initialStateDataSlice: InitialState = {
  authorizationStatus: AuthorizationStatus.Uknown,
  userData:  {
    avatarUrl: '',
    email: '',
    id: -1,
    isPro: false,
    name: '',
    token: ''
  },
};

export const userDataSlice = createSlice({
  name: ReducerNameSpaces.userData,
  initialState: initialStateDataSlice,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
