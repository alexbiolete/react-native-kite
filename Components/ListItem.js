import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ListItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.textPrimary}>
          {item.name}
        </Text>
        <Text style={styles.textSecondary}>
          {item.country}
        </Text>
      </View>
      <View>
        <Icon
          name={item.favourite ? 'star' : 'star-border'}
          size={24}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  textPrimary: {
    fontSize: 16
  },
  textSecondary: {
    marginTop: 4,
    fontSize: 12,
    color: 'gray'
  },
  icon: {
    color: 'goldenrod'
  }
})

export default ListItem
