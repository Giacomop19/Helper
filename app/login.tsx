import { Alert, Pressable, StyleSheet, TextInput } from "react-native";
import { ThemedText  as Text} from "@/components/ThemedText";
import { ThemedView  as View} from "@/components/ThemedView";
import { useSession } from "./ctx";
import { router } from "expo-router";
import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //create local storage
  const handleLogin = () => {
    const userData = {
      username,
      password
    }
    axios
    .post('http://localhost:3000/api/login', userData)
    .then(res => {
      console.log(res.data);
      if (res.status == 200) {
        signIn(res);
        router.replace("/");
      }
    })
    .catch(err => {
      Alert.alert(err.response.data.message)
      console.log(err)
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Helper!</Text>
      <Text style={styles.paragraph}>
        Login to access your application
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput placeholder="Username" style={styles.input} onChange={(e) => setUsername(e.nativeEvent.text)}/>
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <Pressable onPress={handleLogin} style={styles.button} >
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Text style={styles.signup}>Don't have an account?</Text> 
      <Pressable onPress={() => router.push("/register")}>
        <Text>Sign up</Text>
      </Pressable>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    color : 'white',
  },
  button :{
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 15,
    width: '60%',
  },
  text :{
    color : 'white',
    fontSize : 16,
    textAlign : 'center',
    fontWeight : 'bold'
  },
  signup : {
    color : 'white',
    fontSize : 16,
    textAlign : 'center',
    paddingTop : 10
  }
 
});