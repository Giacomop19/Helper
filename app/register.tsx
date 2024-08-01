import React, {useState} from 'react'
import { ThemedText as Text } from '@/components/ThemedText'
import { Alert, Button, Pressable, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ThemedView as View } from '@/components/ThemedView'
import axios from 'axios';

const register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleRegister = () => {
    const userData = {
        username,
        password,
        email
    }
    axios.post('http://localhost:3000/api/register', userData)
    .then((response) => { Alert.alert("Registered succesfull!")
      router.navigate("/login")
      console.log(response.data)
      })
    .catch((error) => {
      console.error(error)
      })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Helper!</Text>
      <Text style={styles.paragraph}>
        Register to access your application
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput placeholder="Username" 
        style={styles.input} 
        onChange={(e) => setUsername(e.nativeEvent.text)}/>
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <TextInput placeholder="Email" 
        style={styles.input}
        onChange={(e) => setEmail(e.nativeEvent.text)} />
      <TouchableOpacity onPress={handleRegister} style={styles.button} >
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.signup}>Already have an account?</Text> 
      <Pressable onPress={() => router.push("/login")}><Text>Login</Text></Pressable>
    </View>
  )
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

export default register