import { Text, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.whiteText,
    fontWeight: theme.fontWeights.bold,
    margin: theme.margins.standardMargin,
    fontFamily: theme.fonts.main
  }
});

const AppBarTab = ({ text }) => {
  return (
    <Text style={styles.text}>{text}</Text>
  );
};

export default AppBarTab;