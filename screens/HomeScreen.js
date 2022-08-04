import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [article, setArticle] = useState([]);

  const data = async () => {
    await axios
      .get(
        `https://stockx.com/api/browse?productCategory=sneakers&sort=release_date&order=ASC&releaseTime=gte-1584918000&country=FR}`
      )
      .then((res) => {
        setArticle(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log();
      });
  };

  useEffect(() => {
    data();
  }, []);

  console.log(article);

  const productList = article.map((produit, k) => (
    <View style={styles.container}>
      <View key={k}>
        <Image
          source={
            produit.Products.media[0]
              ? `https://images.stockx.com/images/${produit.Products.media[0]}`
              : ""
          }
        />
        <Text>{produit.Products.title}</Text>
        <Text>{produit.Products.retailPrice}$</Text>
      </View>
    </View>
  ));

  return <>{productList}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
