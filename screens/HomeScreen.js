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
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeScreen = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [filterData, SetFilterData] = useState([]);

  const navigation = useNavigation();

  const data = async () => {
    await axios
      .get(
        `https://stockx.com/api/browse?productCategory=sneakers&sort=release_date&order=DESC&releaseTime=gte-1584918000&country=FR&page=${pageCurrent}`
      )
      .then((res) => {
        setArticle(res.data.Products);
        SetFilterData(res.data.Products);
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
      <Image
        style={{
          width: 140,
          height: 120,
          paddingHorizontal: 10,
          resizeMode: "contain",
        }}
        source={{ uri: imageUrl }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{releaseDate}</Text>
      <Text style={styles.price}>{retailPrice}€</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
      <Item
        imageUrl={item.media.imageUrl}
        title={item.title}
        releaseDate={item.releaseDate}
        retailPrice={item.retailPrice}
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = filterData.filter((item) => {
        const itemData = item.title ? item.title : "";
        item.colorway ? item.colorway : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setArticle(newData);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={search}
        placeholder="Recherche par marque, couleur"
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        numColumns={2}
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
  },
  item: {
    maxHeight: 250,
    maxWidth: 180,
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 14,
    borderColor: "grey",
    borderWidth: 1,
  },
  img: {
    width: "100%",
    height: 25,
    borderRadius: 8,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
    paddingTop: 20,
    alignItems: "flex-start",
  },
  date: {
    color: "grey",
    fontSize: 10,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "black",
    backgroundColor: "white",
  },
});

export default HomeScreen;
