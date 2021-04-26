import React from 'react'
import {
  FlatList
} from 'react-native'
import ListItem from '../../Components/ListItem'

const Index = ({
  items,
  createFavourite,
  deleteFavourite
}) => {
  return (
    <FlatList
      data={items}
      renderItem={({item}) => <ListItem key={item.id} item={item} createFavourite={createFavourite} deleteFavourite={deleteFavourite} />}
    />
  )
}

export default Index
