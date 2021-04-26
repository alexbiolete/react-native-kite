import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native'

const Filter = ({
  spots,
  setSpots,
  unfilteredSpots,
  filterCountry,
  setFilterCountry,
  filterProbability,
  setFilterProbability
}) => {
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
        onPress={() => {
          filterCountry === '' && filterProbability === '' ?
            setSpots(unfilteredSpots)
          :
            setSpots(spots.filter((spot) => spot.country.toLowerCase().includes(filterCountry.toLowerCase()) && spot.probability.toString().includes(filterProbability.toString())))
          }
        }
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
    fontSize: 16
  },
  textSecondary: {
    marginTop: 4,
    fontSize: 12,
    color: 'gray'
  }
})

export default Filter
