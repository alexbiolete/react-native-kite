import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import ActionBar from '../Components/ActionBar'

const Item = ({ item }) => {

  return (
    <View>
      <ActionBar title={item.title} atItem />
      <View style={styles.element}>
        <Text style={styles.textPrimary}>
          Country
        </Text>
        <Text style={styles.textSecondary}>
          {item.country}
        </Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.textPrimary}>
          Latitude
        </Text>
        <Text style={styles.textSecondary}>
          {item.lat}
        </Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.textPrimary}>
          Longitude
        </Text>
        <Text style={styles.textSecondary}>
          {item.long}
        </Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.textPrimary}>
          Wind probability
        </Text>
        <Text style={styles.textSecondary}>
          {item.probability}%
        </Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.textPrimary}>
          When to go
        </Text>
        <Text style={styles.textSecondary}>
          {item.month}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  element: {
    padding: 15
  },
  textPrimary: {
    fontSize: 16
  },
  textSecondary: {
    marginTop: 4,
    fontSize: 12,
    color: 'gray'
  }
})

export default Item
