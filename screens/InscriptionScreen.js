import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const InscriptionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.text1}>Connectez-vous ou créer un compte</Text>
      <Text style={styles.text2}>pour gérer votre portfolio, vos offres et</Text>
      <Text style={styles.text3}>vos demandes.</Text>
      <TouchableOpacity style={styles.signin}>
        <Text style={styles.sinscrire}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signup}>
        <Text style={styles.connecter}>Se connecter</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "70%",
    height: "10%",
    position: "absolute",
    top: 230,
  },
  text1 :{
    position:"absolute",
    top:330,
  },
  text2 :{
    position:"absolute",
    top:345,
  },
  text3 :{
    position:"absolute",
    top:360,
  },
  signin: {
    borderRadius: 8,
    borderColor:'black',
    borderWidth:1,
    height: 50,
    top: 90,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "black",
    backgroundColor: "rgb(57,57,57)",
  },
  sinscrire:{
    color:"white",
    fontWeight:'bold',
  },
  signup: {
    borderRadius: 8,
    borderColor:'black',
    borderWidth:1,
    height: 50,
    top: 110,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "black",
    backgroundColor: "white",
  },
  connecter:{
    fontWeight:'bold',
  }
});

export default InscriptionScreen;
