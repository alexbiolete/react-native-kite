import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ActionBar = ({ title, atIndex, atItem }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftArea}>
          {!atIndex ? (
            <Icon
              name='arrow-back'
              size={24}
              style={styles.iconBack}
            />
          ) : ('')}
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <Icon
          name='star'
          size={24}
          style={styles.iconStar}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1364C0',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  leftArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#fff'
  },
  iconBack: {
    marginRight: 24,
    color: 'white'
  },
  iconStar: {
    color: 'white'
  }
})

export default ActionBar
