export const selectAllPosts = (state) => state.posts.posts;

export const selectUserPosts = (state) => {
  return state.posts.posts.filter((item) => item.uid === state.auth.uid);
};
