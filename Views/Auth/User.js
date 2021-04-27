import React from 'react'
import {
  StyleSheet,
  View,
  Button
} from 'react-native'

const User = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Log out"
        color="red"
        onPress={() => null}
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
