import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios').default;

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const onPressLogin = async () => {
    axios.post('http://127.0.0.1:9000/api/auth/login/', {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response.data);

      AsyncStorage.setItem("userToken", response.data.token).then((resolve) => {
        console.log(resolve);
        navigation.reset({
          index: 0,
          routes: [{name: "Home"}]
        })
      })
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const {
    formContainerStyle,
    fieldStyle,
    textInputStyle,
    buttonContainerStyle,
    accountCreateContainerStyle,
    loginbuttonContainerStyle,
    loginButtonTextStyle,
  } = styles;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={formContainerStyle}>
        <View style={fieldStyle}>
          <TextInput
            placeholder="username"
            autoCorrect={false}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            style={textInputStyle}
          />
        </View>
        <View style={fieldStyle}>
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            style={textInputStyle}
          />
        </View>

        {/* {this.renderCreateForm()} */}
        <TouchableOpacity
          style={loginbuttonContainerStyle}
          onPress={() => onPressLogin()}
        >
          <Text style={loginButtonTextStyle}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={buttonContainerStyle}>
        {/* {this.renderButton()} */}
        <View style={accountCreateContainerStyle}>
          {/* {this.renderCreateLink()} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
  },
  fieldStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainerStyle: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  accountCreateTextStyle: {
    color: "black",
  },
  accountCreateContainerStyle: {
    padding: 25,
    alignItems: "center",
  },
  loginbuttonContainerStyle: {
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#049AE0",
  },
  loginButtonTextStyle: {
    color: "#FFFFFF",
  },
});
