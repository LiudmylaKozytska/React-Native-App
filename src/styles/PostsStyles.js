import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,

    backgroundColor: "#FFFFFF",
  },

  userInfo: {
    marginTop: 32,
    marginBottom: 32,
    height: 60,

    flexDirection: "row",
    alignItems: "center",
  },

  imgBox: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,

    backgroundColor: "#F6F6F6",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  name: {
    // fontFamily: "RobotoBold",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  email: {
    // fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },

  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,

    backgroundColor: "#F6F6F6",
  },

  title: {
    marginTop: 8,
    marginBottom: 8,
    // fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  box: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  commentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  commentsCount: {
    marginLeft: 9,
    // fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  wrapperLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  // location: {
  //   fontFamily: "RobotoMedium",
  //   fontStyle: "normal",
  //   fontSize: 16,
  //   lineHeight: 19,
  //   color: "#212121",
  // },

  locationName: {
    // fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
