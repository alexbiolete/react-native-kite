import React from 'react'
import {
  StyleSheet,
  View,
  Button
} from 'react-native'

const User = ({ setIsAuthenticated, storeIsAuthenticated }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Log out"
        color="red"
        onPress={() => {
          setIsAuthenticated(false)
          storeIsAuthenticated(false)
        }}
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
