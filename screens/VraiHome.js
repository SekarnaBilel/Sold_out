import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigation } from "@react-navigation/native";
  
  const Maison = () => {
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
  
    // console.log(article);
  
    const productList = article.map((produit) => (
      <TouchableOpacity onPress={() => navigation.navigate("Details", produit)}>
        <View style={styles.container} key={produit.id}>
          <Image
            style={styles.img}
            source={{ uri: produit.lenght !== 0 ? produit.media.imageUrl : null }}
          />
          <Text style={styles.title}>{produit.title}</Text>
          <Text style={styles.date}>{produit.releaseDate}</Text>
          <Text style={styles.price}>{produit.retailPrice}€</Text>
        </View>
      </TouchableOpacity>
    ));
  
    const renderFooter = () => {
      return isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : null;
    };
    
    const handleLoadMore = () => {
      setPageCurrent(pageCurrent + 1);
      setIsLoading(true);
    };
  
    return (
      <ScrollView>
        {/* <TextInput
          style={styles.searchInput}
          value={search}
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Text>{searchResult}</Text> */}
        {productList}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginTop: 80,
      marginHorizontal: 30,
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
      position: "absolute",
      top: 320,
      alignItems: "flex-start",
      fontWeight: "bold",
    },
    price: {
      color: "red",
      fontSize: 18,
      fontWeight: "bold",
      position: "absolute",
      top: 320,
      left: 150,
    },
    searchInput: {
      marginTop: 50,
      height: 50,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: "black",
      backgroundColor: "white",
    },
  });
  
  export default Maison;
  