export const selectUserId = (state) => state.auth.userId;

export const selectUserAvatar = (state) => state.auth.image;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectComments = (state) => state.comments.comments;
