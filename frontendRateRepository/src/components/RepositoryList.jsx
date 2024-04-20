import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import { useState } from "react";
import {Picker} from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";


const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height,
    backgroundColor: theme.colors.mainComponentBackground
  },
  searchBar: {
    margin: theme.margins.standardMargin,
    borderRadius: theme.border.standardBorderRadius,
    backgroundColor: theme.colors.whiteText,
    borderColor: theme.colors.blueBackgroundColour,
    borderWidth: theme.border.standardBorderWidth
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, selectedOrder, 
  setSelectedOrder, filterText, setFilterText }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => (<RepositoryItem item={item}/>)}
        ListHeaderComponent={
          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={setFilterText}
              value={filterText}
              style={styles.searchBar}
            />
            <Picker
              prompt="Select an item..."
              selectedValue={selectedOrder}
              onValueChange={(itemValue) => setSelectedOrder(itemValue) }>
              <Picker.Item label="Latest repositories" value="latest" />
              <Picker.Item label="Highest rated repositories" value="highest" />
              <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>    
          </View>
        }
      />
      <ItemSeparator/>
    </View>
  );
};
  
const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [filterText, setFilterText] = useState("");
  const [value] = useDebounce(filterText, 500);
  const { repositories } = useRepositories(selectedOrder, value);

  return <RepositoryListContainer 
    repositories={repositories} 
    selectedOrder={selectedOrder} 
    setSelectedOrder={setSelectedOrder}
    filterText={filterText}
    setFilterText={setFilterText} />;
};
  
export default RepositoryList;