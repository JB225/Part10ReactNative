import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height,
    backgroundColor: theme.colors.mainComponentBackground
  },
  githubLinkButton: {
    flexGrow:1,
    textAlign: "center",
    color: theme.colors.whiteText,
    margin: theme.margins.standardMargin,
    fontWeight: theme.fontWeights.bold,
    backgroundColor: theme.colors.blueBackgroundColour,
    borderRadius: theme.border.standardBorderRadius,
    fontFamily: theme.fonts.main,
    padding: theme.padding.largeButtonPadding,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {

  const onLinkPress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View>
      <RepositoryItem item ={repository}/>
      <Pressable onPress={onLinkPress}>
        <Text style={styles.githubLinkButton}>Open in GitHub</Text>
      </Pressable>
      <ItemSeparator />
    </View>
  );
};

export default RepositoryInfo;