import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
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

const IndividualRepository = () => {
  let { userId } = useParams();
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, 
    {variables: { "repositoryId": userId }},
    {fetchPolicy: "cache-and-network"});

  const onLinkPress = () => {
    Linking.openURL(data.repository.url);
  };

  if (error) {
    console.log(error);
  }

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <RepositoryItem item ={data.repository}/>
      <Pressable onPress={onLinkPress}>
        <Text style={styles.githubLinkButton}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export default IndividualRepository;