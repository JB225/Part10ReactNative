import { Image, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  avatar: {
    width: 66,
    height: 58,
  },
  flexContainerRow: {
    flexDirection: "row"
  },
  flexContainerColumn: {
    flexDirection: "column",
    flexGrow: 1
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <View style={styles.flexContainerRow}>
        <Image
          style={styles.avatar}
          source={{uri: item.ownerAvatarUrl}}
        />
        <View style={styles.flexContainerColumn}>
          <Text>{item.fullName}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  )
}

export default RepositoryItem;