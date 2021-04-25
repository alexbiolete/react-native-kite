import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native'

const ActionBar = ({ title }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#1364C0',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#fff'
  }
})

export default ActionBar
