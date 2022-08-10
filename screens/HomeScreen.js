import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeScreen = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  const navigation = useNavigation();

  const data = async () => {
    await axios
      .get(
        `https://stockx.com/api/browse?productCategory=sneakers&sort=release_date&order=ASC&releaseTime=gte-1584918000&country=FR&page=${pageCurrent}`
      )
      .then((res) => {
        setArticle(res.data.Products);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    data();
  }, [pageCurrent]);

  const Item = ({ title, releaseDate, retailPrice, imageUrl }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{releaseDate}</Text>
      <Text style={styles.price}>{retailPrice}€</Text>
      <Image styles={styles.img} source={{uri: imageUrl}} /> 
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
      <Item
        title={item.title}
        releaseDate={item.releaseDate}
        retailPrice={item.retailPrice}
        imageUrl={item.media.imageUrl}
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa"/>
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={article}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  img: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 20,
    alignItems: "flex-start",
  },
  date: {
    color: "grey",
    fontSize: 18,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader:{
    marginVertical:16,
    alignItems:"center",
  }
});

export default HomeScreen;
