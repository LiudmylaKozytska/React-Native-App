import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  camera: {
    position: "relative",
    height: 240,
    width: "100%",
    // flex: 1,
    borderRadius: 9,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },

  previewPhoto: {
    marginHorizontal: 16,
    height: 240,
    width: "100%",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },

  icon: {
    position: "absolute",
    top: 90,
    left: "42%",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 1,

    backgroundColor: "#FFFFFF",
  },

  text: {
    // fontFamily: "RobotoRegular",
    marginTop: 8,
    marginBottom: 32,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  input: {
    paddingTop: 15,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",

    // fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  inputLocation: {
    marginTop: 16,
    paddingTop: 15,
    paddingBottom: 16,
    paddingLeft: 26,

    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",

    // fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  locationBtn: {
    position: "absolute",
    top: "65%",
    width: 25,
    height: 25,
  },

  button: {
    marginTop: 32,
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F6F6F6",

    // fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  buttonActive: {
    marginTop: 32,
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF6C00",
  },

  buttonText: {
    color: "#BDBDBD",
  },

  buttonTextActive: {
    color: "#fff",
  },

  deleteBtn: {
    width: 70,
    height: 40,

    marginTop: 120,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  goBackBtn: {
    position: "absolute",
    left: 15,
    top: -15,
    zIndex: 999,
  },
});
