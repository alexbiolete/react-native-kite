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

const Register = ({
  users,
  onAdd,
  fetchSession,
  setIsAuthenticated,
  storeIsAuthenticated
}) => {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmit = () => {
    // Data validation for Registration
    // If the fields are not completed, the two passwords do
    // not match or the e-mail address is already used by an
    // user, it will be shown an alert. Otherwise, the
    // registration process will proceed.
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Please complete all fields.')
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.')
      return
    } else if (users.some((user) => {
      return user.email === email
    })) {
      Alert.alert('E-mail already in use.')
      return
    } else {
      // Create user
      onAdd({
        name,
        email,
        password
      })

      // Notify, empty fields and go to splash
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      Alert.alert('Registration successful.')
      fetchSession({ email, password })
      setIsAuthenticated(true)
      storeIsAuthenticated(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          textContentType='name'
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          E-mail
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
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Confirm password
        </Text>
        <TextInput
          style={styles.input}
          textContentType='password'
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <Button
        title="Sign up"
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
  }
})

export default Register
