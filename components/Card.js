import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ navigation }) => {
  const [article, setArticle] = useState([]);

  const data = async () => {
    await axios
      .get(
        `https://stockx.com/api/browse?productCategory=sneakers&sort=release_date&order=ASC&releaseTime=gte-1584918000&country=FR}`
      )
      .then((res) => {
        setArticle(res.data.Products);
        console.log(res.data.Products);
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
    <View style={styles.container}  onPress={() => navigation.navigate("Product")} key={k}>
      <Image source={produit.media.imageUrl ? produit.media.imageUrl : ""} />
      {console.log(produit.media.imageUrl)}
      <Text>{}</Text>
      <Text>
        {produit.title}
      </Text>
      <Text>{produit.retailPrice}$</Text>
    </View>
  ));

  return (
    <ScrollView>
      {productList}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor:'black',
    borderWidth:1,
    marginTop:30,
    marginHorizontal:30,
  },
});

export default Card;
