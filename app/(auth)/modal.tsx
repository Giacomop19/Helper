import { StyleSheet, Pressable, Image, TextInput } from 'react-native';
import { ThemedText as Text } from '@/components/ThemedText';
import { ThemedView as View } from '@/components/ThemedView';
import { Colors } from "@/constants/Colors";
import { useColorScheme } from '@/hooks/useColorScheme'
import { FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { useSession } from '../ctx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserDto from '@/helpers/user';

export default function ModalScreen() {
  const colorScheme = useColorScheme()
  const img = require('../../assets/images/jacob_logo.jpeg')
  const { token } = useSession()
  const [pressed, setPressed] = useState(false)
  const [editUser, setEditUser] = useState(true)
  const [user, setUser] = useState<UserDto>({
    username : "",
    email : "",
    date : new Date,
    job: "",
    mobile: "",
    avatar: ""
  })

  async function getData(){
    axios
      .post('http://localhost:3000/api/getUser', {token : token})
      .then(res =>{
        console.log(res.data.data)
        setUser((prevState) => ({
          ...prevState,
          username : res.data.data.username,
          email : res.data.data.email,
          job : res.data.data?.job,
          mobile : res.data.data?.mobile,
        }))
        console.log(user)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  useEffect(() => {getData()},[])

  const editInfoUser = () => {
    setEditUser(!editUser)
    setPressed(!pressed)
  }

  const handleUserChange = (prop: string, newProp: any) =>{
    setUser((prevUser) => ({
      ...prevUser,
      [prop]: newProp,
    }))
    console.log("userChange", user)
  }

  return (
    <View style={styles.container}>
      <View style={styles.edit}> 
        {!pressed ? (
          <Pressable onPress={()=> editInfoUser()}>
          {({ pressed }) => (
             <FontAwesome
              name="edit"
              size={25}
              color={Colors[colorScheme ?? "dark"].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
          )}
          </Pressable>
        ):(
          <Pressable onPress={()=> editInfoUser()}>
            {({ pressed }) => (
             <FontAwesome
              name="save"
              size={25}
              color={Colors[colorScheme ?? "dark"].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
          )}
          </Pressable>
        )}
      </View>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.avatar}
          source={img}
        />
      </View>
      <View style={{marginTop : 10}}>
        <Text style={styles.title}>{user?.username}</Text>
      </View>
      <View style={{marginTop: 20, marginHorizontal: 25}}>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={{marginTop: 10}}>
              <FontAwesome
                name="envelope"
                size={25}
                color={Colors[colorScheme ?? "dark"].text}
              />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Email</Text>
              <Text style={styles.infoLarge_Text}>
                {user?.email}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={{marginTop: 10}}>
              <FontAwesome5
                name="book"
                size={25}
                color={Colors[colorScheme ?? "dark"].text}
              />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Profession</Text>
              <TextInput 
                style={styles.infoLarge_Text} 
                editable={!editUser} 
                selectTextOnFocus={!editUser}
                value={user?.job}
                onChangeText={(text) => handleUserChange("job", text)}
                >
              </TextInput>
            </View>
          </View>
        </View>

        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={{marginTop: 10, paddingRight:8}}>
              <FontAwesome5
                name="mobile-alt"
                size={25}
                color={Colors[colorScheme ?? "dark"].text}
              />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Mobile</Text>
              <TextInput 
                style={styles.infoLarge_Text}
                editable={!editUser} 
                selectTextOnFocus={!editUser}
                value={user?.mobile}
                onChangeText={(text) => handleUserChange("mobile", text)}
                >
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  edit : {
    alignSelf: 'flex-end',
    marginTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  avatar: {
    borderRadius: 100,
    height: 200,
    width: 200,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  infoMain: {
    marginTop: 10,
  },
  infoCont: {
    width: '100%',
    flexDirection: 'row',
  },
  infoIconCont: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    elevation: -5,
    borderColor: 'black',
    backgroundColor: 'black',
  },
  infoText: {
    width: '80%',
    flexDirection: 'column',
    marginLeft: 25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#e6e6e6',
  },
  infoSmall_Text: {
    fontSize: 13,
    color: '#b3b3b3',
    fontWeight: '500',
  },
  infoLarge_Text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});