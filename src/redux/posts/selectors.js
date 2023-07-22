import { createSelector } from "reselect";
export const selectAllPosts = (state) => state.posts.posts;

export const selectUserPosts = (state) => {
  return state.posts.posts.filter((item) => item.uid === state.auth.uid);
};

// const selectUserPosts = createSelector(
//   (state) => state.posts.posts,
//   (state) => state.comments.comments,
//   (posts, comments) => {
//     const userPosts = posts.filter((post) => post.userId === state.auth.login);
//     console.log(userPosts);
//     return userPosts;
//   }
// );
// export { selectUserPosts };
