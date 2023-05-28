export const selectUserId = (state) => state.user.userId;
export const selectLogin = (state) => state.user.displayName;
export const selectUserEmail = (state) => state.user.email;
export const selectIsLoggedIn = (state) => state.user.userId !== null;
