import React from 'react'
import PropTypes from 'prop-types'
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

Index.propTypes = {
  items: PropTypes.array,
  createFavourite: PropTypes.func,
  deleteFavourite: PropTypes.func
}

export default Index
