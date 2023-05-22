import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const SubmitButton = ({ title }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginBottom: 16,
    padding: 16,

    alignItems: "center",

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
