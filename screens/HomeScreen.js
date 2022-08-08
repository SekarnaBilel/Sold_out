import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [article, setArticle] = useState([]);

  const navigation = useNavigation();

  const data = async () => {
    await axios
      .get(
        `https://stockx.com/api/browse?productCategory=sneakers&sort=release_date&order=ASC&releaseTime=gte-1584918000&country=FR`
      )
      .then((res) => {
        setArticle(res.data.Products);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };  

  useEffect(() => {
    data();
  }, []);

  // console.log(article);

  const productList = article.map((produit) => (
    <TouchableOpacity onPress={() => navigation.navigate("Details", produit)}>
      <View style={styles.container} key={produit.id}>
        <Image style={styles.img} source={{ uri: produit.media.imageUrl }} />
        <Text style={styles.title}>{produit.title}</Text>
        <Text style={styles.date}>{produit.releaseDate}</Text>
        <Text style={styles.price}>{produit.retailPrice}€</Text>
      </View>
    </TouchableOpacity>
  ));

  return <ScrollView>{productList}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
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
});

export default HomeScreen;
