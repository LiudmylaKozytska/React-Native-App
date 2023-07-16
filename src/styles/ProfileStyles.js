import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  wrapper: {
    marginTop: 250,
    paddingHorizontal: 16,

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    backgroundColor: "#FFFFFF",
  },

  userInfo: {
    marginTop: 32,
    height: 100,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logOutBtn: {
    position: "absolute",
    top: -10,
    right: 16,
  },

  imgBox: {
    position: "absolute",
    left: "35%",
    top: -92,
    marginRight: 8,

    width: 120,
    height: 120,

    backgroundColor: "#E8E8E8",
    borderRadius: 16,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  name: {
    // fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },

  postsList: {},

  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },

  box: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 32,
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
    color: "#212121",
  },

  wrapperLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  location: {
    // fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  locationName: {
    marginLeft: 4,
    // fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
