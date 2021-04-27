import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Filter = ({
  spots,
  setSpots,
  unfilteredSpots,
  filterCountry,
  setFilterCountry,
  filterProbability,
  setFilterProbability
}) => {
  const navigation = useNavigation()

  const onSubmit = () => {
    if (filterCountry === '' && filterProbability === '') {
      setSpots(unfilteredSpots)
      navigation.goBack()
    } else {
      setSpots(spots.filter((spot) => spot.country.toLowerCase().includes(filterCountry.toLowerCase()) && spot.probability.toString().includes(filterProbability.toString())))
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Country
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFilterCountry(text)}
          value={filterCountry}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Wind probability
        </Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(text) => setFilterProbability(text)}
          value={filterProbability}
        />
      </View>
      <Button
        title="Apply"
        onPress={() => onSubmit()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  inputWrapper: {
    marginBottom: 32
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
  },
  textPrimary: {
    textTransform: 'uppercase',
    fontSize: 16
  },
  textSecondary: {
    marginTop: 4,
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'gray'
  }
})

export default Filter
