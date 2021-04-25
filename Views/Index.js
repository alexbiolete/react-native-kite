import React from 'react'
import {
  View,
  FlatList
} from 'react-native'
import ActionBar from '../Components/ActionBar'
import ListItem from '../Components/ListItem'

const Index = ({ items }) => {

  return (
    <View>
      <ActionBar title="Kitesurfing App" atIndex />
      <FlatList
        data={items}
        renderItem={({item}) => <ListItem key={item.id} item={item} />}
      />
    </View>
  )
}

export default Index
