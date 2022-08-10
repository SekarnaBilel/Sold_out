import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const DetailsScreen = (props) => {
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.img}>
          <Image
            style={styles.image}
            source={{
              uri: product.length !== 0 ? product.media.imageUrl : null,
            }}
          />
        </View>
        <View style={styles.nameText}>
          <Text style={styles.title}>{product.shoe}</Text>
          <Text style={styles.name}>{product.name}</Text>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.price}>
            <Text style={styles.priceText}>{product.retailPrice}€</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.description}>
          <Text style={styles.desProduct}>Description :</Text>
          <Text>
            {product.description
              ? product.description
              : "Non disponible"}
          </Text>
        </View>
        <View style={styles.des}>
          <Text style={styles.desProduct}>Description du produit</Text>
          <View style={styles.desList}>
            <Text>Style</Text>
            <Text style={styles.styleId}>{product.styleId}</Text>
          </View>
          <View style={styles.desList}>
            <Text>Coloris</Text>
            <Text style={styles.styleId}>{product.colorway}</Text>
          </View>
          <View style={styles.desList}>
            <Text>Prix Retail</Text>
            <Text style={styles.styleId}>{product.retailPrice}€EUR</Text>
          </View>
          <View style={styles.desList}>
            <Text>Date de sortie</Text>
            <Text style={styles.styleId}>{product.releaseDate}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameText: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  img: {
    backgroundColor: "white",
    paddingHorizontal:20,

  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    borderRadius: 8,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "flex-start",
    marginTop: 10,
  },
  name: {
    color: "black",
    fontSize: 18,
    alignItems: "flex-start",
    marginTop: 10,
  },
  price: {
    backgroundColor: "red",
    borderRadius: 8,
    borderColor: "black",
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  btn: {
    alignItems: "flex-end",
    bottom: 20,
    paddingHorizontal:20,
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    bottom: 20,
    paddingHorizontal:20,
  },
  desProduct: {
    fontSize: 18,
    fontWeight: "bold",
    bottom: 20,
  },
  des: {
    top: 20,
    paddingHorizontal: 20,
    paddingBottom:40,
  },
  desList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  priceText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  styleId: {
    fontWeight: "bold",
  },
});

export default DetailsScreen;
