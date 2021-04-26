import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ListItem = ({
  item,
  createFavourite,
  deleteFavourite
}) => {
  const rightSwipe = () => {
    return (
      <TouchableOpacity
        style={item.favourite ? styles.swipeRed : styles.swipeBlue}
        onPress={() => {item.favourite ? deleteFavourite(item.id) : createFavourite(item.id) }}
      >
        <Text style={styles.swipeText}>
          {item.favourite ? 'Delete' : 'Add'}
        </Text>
      </TouchableOpacity>
    )
  }
  const navigation = useNavigation()

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <TouchableOpacity style={styles.container} onPress={() => {
        navigation.navigate('Item', item)
      }}>
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
    </Swipeable>
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
  },
  swipeRed: {
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4436'
  },
  swipeBlue: {
    width: 128,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0385FF'
  },
  swipeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  }
})

export default ListItem
