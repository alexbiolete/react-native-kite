import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  SafeAreaView,
} from 'react-native'
import { dbApiUrl } from './App/config'
import Index from './Views/Index'
import Item from './Views/Item'

const App = () => {
  // Mock data
  const items = [
    {
      id: '1',
      title: 'New York City',
      country: 'United States',
      lat: 916.36,
      long: 440.61,
      probability: 72.1,
      month: 'July',
      favourite: false
    },
    {
      id: '2',
      title: 'Miami',
      country: 'United States',
      favourite: true
    }
  ]

  return (
    <SafeAreaView>
      {/* Pages */}
      {/* <Index items={items} /> */}
      <Item item={items[0]} />
      {/* Expo status bar */}
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default App
