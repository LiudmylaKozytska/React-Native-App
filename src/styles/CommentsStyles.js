import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },

  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
  },

  wrapper: {
    height: 280,
  },

  commentContainer: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, 0.03)",
  },

  avatarContainer: {
    borderRadius: 50,
  },

  avatar: {
    width: 40,
    height: 40,
    margin: 0,
    padding: 0,
  },

  input: {
    marginBottom: 16,
    padding: 16,
    height: 50,

    // fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",

    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  button: {
    position: "absolute",
    right: 0,
    bottom: -7,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 32,
    marginBottom: 30,

    height: 35,
    width: 35,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
});
