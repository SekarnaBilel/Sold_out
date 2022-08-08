import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';


const ArticleId = (props) => {
  const [product, setProduct] = useState([]);

  const route = useRoute();
  
  const data = async () => {
    await axios
      .get(
        `https://stockx.com/api/products/${route.params.shortDescription}?includes=market,360&currency=EUR&country=FR`
      )
      .then((res) => {
        setProduct(res.data.Product);
        console.log(res.data.Product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    data();
  }, []);

  console.log(product);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.price}>
        <Text style={styles.priceText}>{product.retailPrice}€</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{product.shoe}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      {/* <Image style={styles.image} source={{ uri: product.media.imageUrl }} /> */}
        <Text>Description du produit</Text>
        <Text style={styles.styleId}>Style{product.styleId}</Text>
        <Text>Coloris{product.colorway}</Text>
        <Text>Prix Retail{product.retailPrice}€EUR</Text>
        <Text>Date de sortie{product.releaseDate}</Text>
        <Text>Description du produit</Text>
        <Text>Date de sortie{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:"column",
    // justifyContent: "center",
    // alignItems:"flex-end"
    flexWrap:"wrap",
    alignContent:"flex-end",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "flex-start",
  },
  name: {
    color: "black",
    fontSize: 18,
    alignItems: "flex-start",
  },
  price: {
    backgroundColor: "red",
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // top: 320,
    // left: 150,
  },
  priceText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  styleId:{
    display:"flex",
    justifyContent:"space-between"
  }
});
export default ArticleId;
