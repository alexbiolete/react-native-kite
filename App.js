import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  SafeAreaView,
} from 'react-native'
import { dbApiUrl } from './App/config'
import ActionBar from './Components/ActionBar'
import Index from './Views/Index'

const App = () => {
  // Mock data
  const items = [
    {
      id: '1',
      title: 'New York City',
      country: 'United States',
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
      {/* Application bar / Action bar */}
      <ActionBar title="Kitesurfing App" />
      {/* Pages */}
      <Index items={items} />
      {/* Expo status bar */}
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default App
