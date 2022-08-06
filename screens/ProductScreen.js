import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { View, Text } from "react-native";

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const data = async () => {
    await axios
      .get(
        `https://stockx.com/api/browse?productCategory=${id}sneakers&sort=release_date&order=ASC&releaseTime=gte-1584918000&country=FR}`
      )
      .then((res) => {
        setProduct(res.data.Products);
      })
      .catch((err) => {
        console.log("Server respondend with error: ", err);
      });
  };

  useEffect(() => {
    data();
    console.log(data);
  }, [id]);
  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};

export default ProductScreen;
