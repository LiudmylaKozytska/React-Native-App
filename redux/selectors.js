export const selectUserId = (state) => state.user.userId;
export const selectLogin = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.email;
export const selectUserAvatar = (state) => state.user.image;
export const selectIsLoggedIn = (state) => state.user.userId !== null;
