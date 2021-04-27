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

const Login = ({
  users,
  fetchSession,
  setIsAuthenticated,
  storeIsAuthenticated
}) => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidCreditentials, setInvalidCreditentials] = useState(false)

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
        setEmail('')
        setPassword('')
        fetchSession({ email, password })
        setIsAuthenticated(true)
        storeIsAuthenticated(true)
        return
      }
    })

    setEmail('')
    setPassword('')
    setInvalidCreditentials(true)
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
      {invalidCreditentials ? (
        <View>
          <Text style={styles.textDanger}>
            Invalid e-mail and/or password.
          </Text>
        </View>
      ) : null}
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
    marginBottom: 16
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
  },
  textDanger: {
    marginBottom: 16,
    fontSize: 14,
    color: 'red'
  }
})

export default Login
