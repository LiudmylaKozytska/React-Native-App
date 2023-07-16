export const selectUser = (state) => state.auth;
export const selectUserId = (state) => state.auth.uid;
export const selectUserPhoto = (state) => state.auth.image;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectIsLoading = (state) => state.auth.loading;
export const selectLogin = (state) => state.auth.userName;
export const selectUserEmail = (state) => state.auth.email;
