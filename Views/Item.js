import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native'
import { useRoute } from '@react-navigation/native';

const Item = () => {
  const route = useRoute()
  const item = route.params

  return (
    <ScrollView>
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
    </ScrollView>
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
