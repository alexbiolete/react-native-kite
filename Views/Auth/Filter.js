import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';

const Filter = ({
  spots,
  setSpots,
  unfilteredSpots,
  sortArray,
  removeDuplicates,
  filterCountry,
  setFilterCountry,
  filterProbability,
  setFilterProbability
}) => {
  const navigation = useNavigation()
  const items = sortArray(removeDuplicates(spots, 'country'))

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
        <View style={styles.input}>
          <Picker
            selectedValue={filterCountry}
            onValueChange={(value) =>setFilterCountry(value)}
          >
            <Picker.Item key={0} value='' label='' />
            {items.map((item, index) => (
              <Picker.Item key={index} value={item.country} label={item.country} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.textPrimary}>
          Wind probability
        </Text>
        <TextInput
          style={[styles.input, { padding: 8 }]}
          keyboardType='numeric'
          value={filterProbability}
          onChangeText={(value) => setFilterProbability(value)}
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
