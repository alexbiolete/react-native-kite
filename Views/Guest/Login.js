import React from 'react'
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TextInput,
  Button
} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions'

const Login = ({
  users,
  setName,
  setLoginLocal
}) => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    if (!email || !password) {
      Alert.alert('Please complete all fields.')
      return
    }

    // Check if the creditentials exist. If the user name is
    // set, it will be redirected to the Index (logic in
    // App).
    users.forEach((user) => {
      if (user.email === email && user.password === password) {
        Alert.alert('Authentication successful.')
        setName(user.name)
        // useDispatch(login({'email': email, 'password': password }))
        setEmail('')
        setPassword('')
        // navigation.goBack()
        return
      }
    })

    // Alert.alert('Invalid e-mail and/or password.')
    // setEmail('')
    // setPassword('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          textContentType='emailAddress'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary} >
          Password
        </Text>
        <TextInput
          style={styles.input}
          textContentType='password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        title="Log in"
        onPress={() => onSubmit()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  inputWrapper: {
    marginBottom: 32
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
  },
  textPrimary: {
    textTransform: 'uppercase',
    fontSize: 16
  },
  textSecondary: {
    marginTop: 4,
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'gray'
  }
})

export default Login
