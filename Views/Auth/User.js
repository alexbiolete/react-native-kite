import React from 'react'
import PropTypes from 'prop-types'
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

User.propTypes = {
  setIsAuthenticated: PropTypes.func,
  storeIsAuthenticated: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})

export default User
