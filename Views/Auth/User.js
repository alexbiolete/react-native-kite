import React from 'react'
import {
  StyleSheet,
  View,
  Button
} from 'react-native'

const User = ({ setName }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Log out"
        color="red"
        onPress={() => setName('')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})

export default User
