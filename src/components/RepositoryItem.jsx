import { Image, Text, View, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  primaryText: {
    fontWeight: theme.fontWeights.bold,
    margin: theme.margins.standardMargin,
    marginBottom: theme.margins.topOrBottomMargin,
    fontFamily: theme.fonts.main
  },
  secondaryText: {
    margin: theme.margins.standardMargin,
    marginTop: theme.margins.topOrBottomMargin,
    fontFamily: theme.fonts.main
  },
  avatar: {
    width: theme.smallImage.width,
    height: theme.smallImage.height,
    margin: theme.smallImage.margin,
    borderRadius: theme.border.standardBorderRadius
  },
  languageStyle: {
    backgroundColor: theme.colors.blueBackgroundColour,
    alignSelf: "flex-start",
    color: theme.colors.whiteText,
    padding: theme.padding.standardPadding,
    borderRadius: theme.border.standardBorderRadius
  },
  flexContainerRow: {
    flexDirection: "row",
    margin: theme.margins.standardMargin,
  },
  flexContainerColumn: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    flexShrink: 1
  },
  flexContainerCenter: {
    alignItems: "center",
  }
});

const RepositoryItem = ({ item }) => {

  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + "k" : Math.sign(num)*Math.abs(num);
  };

  return (
    <View>
      <View style={styles.flexContainerRow}>
        <Image
          style={styles.avatar}
          source={{uri: item.ownerAvatarUrl}}
        />
        <View style={styles.flexContainerColumn}>
          <Text style={styles.primaryText}>{item.fullName}</Text>
          <Text style={styles.secondaryText}>{item.description}</Text>
          <Text style={styles.languageStyle}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.flexContainerRow}>
        <View style={[styles.flexContainerColumn, styles.flexContainerCenter]}> 
          <Text style={styles.primaryText}>{kFormatter(item.stargazersCount)}</Text>
          <Text style={styles.secondaryText}>Stars</Text>
        </View>
        <View style={[styles.flexContainerColumn, styles.flexContainerCenter]}> 
          <Text style={styles.primaryText}>{kFormatter(item.forksCount)}</Text>
          <Text style={styles.secondaryText}>Forks</Text>
        </View>
        <View style={[styles.flexContainerColumn, styles.flexContainerCenter]}> 
          <Text style={styles.primaryText}>{item.reviewCount}</Text>
          <Text style={styles.secondaryText}>Reviews</Text>
        </View>
        <View style={[styles.flexContainerColumn, styles.flexContainerCenter]}> 
          <Text style={styles.primaryText}>{item.ratingAverage}</Text>
          <Text style={styles.secondaryText}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;