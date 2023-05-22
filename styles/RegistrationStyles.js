import { StyleSheet } from "react-native";

// const font = require("../assets/fonts/RobotoRegular.ttf");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",

    width: "100%",
    resizeMode: "cover",
  },

  formContainer: {
    position: "relative",

    width: "100%",
    height: 549,
    paddingRight: 16,
    paddingLeft: 16,

    backgroundColor: "#ffffff",

    borderTopEndRadius: 25,
    borderTopStartRadius: 25,

    alignItems: "center",
  },

  addImageContainer: {
    position: "absolute",
    top: -60,

    width: 120,
    height: 120,
    borderRadius: 16,

    backgroundColor: "#F6F6F6",
  },

  addPhotoBtn: {
    position: "absolute",
    right: -5,
    bottom: 5,
  },

  formTitle: {
    // fontFamily: { font },
    fontSize: 30,
    lineHeight: 35.16,

    marginTop: 92,
    marginBottom: 33,

    color: "#212121",
  },

  inputBox: { width: "100%" },

  formInput: {
    height: 50,
    width: "100%",

    fontSize: 16,
    lineHeight: 18.75,

    marginBottom: 16,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 14,

    backgroundColor: "#f6f6f6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,

    overflow: "hidden",
  },

  formPasswordInput: {
    height: 50,
    width: "100%",

    marginBottom: 43,

    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 14,

    fontSize: 16,
    lineHeight: 18.75,

    backgroundColor: "#f6f6f6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
  },

  showPasswordContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  showPasswordText: {
    fontSize: 16,
    lineHeight: 18.75,
    padding: 16,

    color: "#1B4371",
  },

  activeFormInput: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },

  registerText: {
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
});
