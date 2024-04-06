import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height,
    backgroundColor: theme.colors.mainComponentBackground
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => (<RepositoryItem item={item}/>)}
      />
      <ItemSeparator/>
    </View>
  );
};

export default RepositoryList;