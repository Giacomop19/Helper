import { Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ThemedText  as Text} from "@/components/ThemedText";
import { ThemedView  as View} from "@/components/ThemedView";
import { useSession } from "./ctx";
import { router } from "expo-router";

export default function Login() {
  const { signIn } = useSession();
  const handleLogin = () => {
    //Adicione sua lógica de login aqui
    signIn();
    //Antes de navegar, tenha certeza de que o usuário está autenticado
    router.replace("/");
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
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button} >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signup}>Don't have an account? Sign up</Text>
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