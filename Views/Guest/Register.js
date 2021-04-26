import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native'

const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Username
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={() => ''}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          E-mail
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={() => ''}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={() => ''}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Password confirmation
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={() => ''}
        />
      </View>
      <Button
        title="Sign up"
        onPress={() => ''}
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

export default Register
