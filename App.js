import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { dbApiUrl } from './App/config'
import Home from './Views/Guest/Home'
import Register from './Views/Guest/Register'
import Login from './Views/Guest/Login'
import Index from './Views/Auth/Index'
import Item from './Views/Auth/Item'
import Filter from './Views/Auth/Filter'
import User from './Views/Auth/User'

const Stack = createStackNavigator()

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState([])
  const [spots, setSpots] = useState([])
  const [unfilteredSpots, setUnfilteredSpots] = useState([])
  const [favourites, setFavourites] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [filterProbability, setFilterProbability] = useState('')

  useEffect(() => {
    const retrieveAuthenticated = async () => {
      const authenticated = await getIsAuthenticated()
      setIsAuthenticated(authenticated ? true : false)
    }

    retrieveAuthenticated()
  }, [])

  useEffect(() => {
    const retrieveUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUsers(usersFromServer)
    }

    retrieveUsers()
  }, [])

  useEffect(() => {
    const retrieveFavourites = async () => {
      const favouritesFromServer = await fetchFavourites()
      setFavourites(favouritesFromServer)

      // If there are no favourites fetched (probably because there is no internet connection, don't overwrite the favourites from AsyncStorage)
      if (favouritesFromServer !== null) {
        storeFavourites(favouritesFromServer)
      }
    }

    retrieveFavourites()
  }, [])

  useEffect(() => {
    const retrieveSpots = async () => {
      const spotsFromServer = await fetchSpots()

      // Assign a 'favourite' field (bool) for each Spot element
      // and set it to true if the id corresponds to any
      // spot value from each Favourite element.
      spotsFromServer.forEach((spot) => {
        spot.favourite = favourites.some((favourite) => {
          return spot.id === favourite.spot.toString()
        })
      })

      // const data = []

      // // If there are no spots fetched (probably because there is no internet connection, don't overwrite the spots from AsyncStorage)
      // if (spotsFromServer !== null) {
      //   storeSpots(spotsFromServer)
      //   data = getSpots()
      // }

      setSpots(spotsFromServer)
      // Set a back-up array to restore the main one after
      // removing filters.
      setUnfilteredSpots(spotsFromServer)
    }

    retrieveSpots()
  }, [favourites])

    // Method for removing duplicates from Picker elements (Filter component)
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key])
        return [...removed, item]
      }, [])
    }

  // Method for sorting Picker elements (Filter component)
  const sortArray = (array) => {
    let uniqueMap = new Map()
    const sortedItems = useMemo(() => {
      var sortableItems = [...array]
      sortableItems.sort((a, b) => {
        if (a.country.toLowerCase() > b.country.toLowerCase()) {
          return 1
        }
        return -1
      }).reduce((unique, o) => {
        if(!unique.some(obj => obj.country === o.country)) {
          unique.push(o);
        }
        return unique;
      },[])
      return sortableItems
    }, [array])
    return sortedItems
  }

  const storeIsAuthenticated = async (value) => {
    try {
      const jsonData = JSON.stringify(value)
      await AsyncStorage.setItem('isAuthenticated', jsonData)
    } catch (e) {}
  }

  const getIsAuthenticated = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('isAuthenticated'))
      if (value !== null) {}
    } catch (e) {}
  }

  const storeUsers = async (data) => {
    try {
      const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem('users', jsonData)
    } catch (e) {}
  }

  const storeFavourites = async (data) => {
    try {
      const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem('favourites', jsonData)
    } catch (e) {}
  }

  const getFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem('favourites')
      if (value !== null) {}
    } catch (e) {}
  }

  const storeSpots = async (data) => {
    try {
      const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem('spots', jsonData)
      await AsyncStorage.setItem('unfilteredSpots', jsonData)
    } catch (e) {}
  }

  const getSpots = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('spots'))
      if (value !== null) {}
    } catch (e) {}
  }

  const getUnfilteredSpots = async () => {
    try {
      const value = await AsyncStorage.getItem('unfilteredSpots')
      if (value !== null) {}
    } catch (e) {}
  }

  const fetchSession = async (loginData) => {
    const response = await fetch(`${dbApiUrl}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    const data = await response.json()

    return data.toString()
  }

  const fetchUsers = async () => {
    const response = await fetch (`${dbApiUrl}/user`)
    const data = await response.json()

    return data
  }

  const createUser = async (user) => {
    const response = await fetch(`${dbApiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()

    setUsers([...users, data])
  }

  const readUser = async (id) => {
    const response = await fetch(`${dbApiUrl}/user/${id}`)
    const data = await response.json()

    return data
  }

  const updateUser = async (id) => {
    const userToUpdate = await readUser(id)
    const userUpdated = { ...userToUpdate,
      email: userToUpdate.email,
      password: userToUpdate.password
    }
    const response = await fetch(`${dbApiUrl}/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userUpdated)
    })

    const data = await response.json()

    setUsers(
      users.map((user) =>
        user.id === id ? { ...user,
          email: data.email,
          password: data.password
        } : user
      )
    )
  }

  const deleteUser = async (id) => {
    const response = await fetch(`${dbApiUrl}/user/${id}`, {
      method: 'DELETE'
    })

    setUsers(users.filter((user) => user.id !== id))
  }

  const fetchFavourites = async () => {
    const response = await fetch(`${dbApiUrl}/favourites`)
    const data = await response.json()

    return data
  }

  const createFavourite = async (id) => {
    const response = await fetch(`${dbApiUrl}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        spot: parseInt(id)
      })
    })

    const data = await response.json()

    // After sending the Favourite object to the API, set
    // related Spot's favourite field to true.
    spots.forEach((spot) => {
      if (spot.id === data.spot) {
        spot.favourite = true
      }
    })

    setFavourites([...favourites, data])
  }

  const readFavourite = async (id) => {
    const response = await fetch(`${dbApiUrl}/favourites/${id}`)
    const data = await response.json()

    return data
  }

  const updateFavourite = async (id) => {
    const favouriteToUpdate = await readFavourite(id)
    const favouriteUpdated = { ...favouriteToUpdate,
      spot: favouriteToUpdate.spot
    }
    const response = await fetch(`${dbApiUrl}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favouriteUpdated)
    })

    const data = await response.json()

    setFavourites(
      favourites.map((favourite) =>
        favourite.id === id ? { ...favourite,
          spot: data.spot
        } : favourite
      )
    )
  }

  const deleteFavourite = async (spot_id) => {
    var id = 0

    // Find Favourite element id based on Spot id.
    favourites.forEach((favourite) => {
      if (favourite.spot.toString() === spot_id) {
        id = favourite.id.toString()
      }
    })

    // After deleting the Favourite object from the API, set
    // related Spot's favourite field to false.
    spots.forEach((spot) => {
      if (spot.id === spot_id) {
        spot.favourite = false
      }
    })

    const response = await fetch(`${dbApiUrl}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    setFavourites(favourites.filter((favourite) => favourite.id !== id))
  }

  const fetchSpots = async () => {
    const response = await fetch(`${dbApiUrl}/spot`)
    const data = await response.json()

    return data
  }

  const createSpot = async (spot) => {
    /*
     * Generate random values in fields that are not available
     * in the form from ModalAddItem component, since there is
     * no "location picker" implemented for the map or any
     * API for Wind Probability.
     */
    spot.lat = (Math.random() * 100).toFixed(4).toString()
    spot.long = (Math.random() * 100).toFixed(4).toString()
    spot.probability = (Math.floor(Math.random() * 100))
    spot.month = months[Math.floor(Math.random() * months.length)]

    const response = await fetch(`${dbApiUrl}/spot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    })
    const data = await response.json()

    setSpots([...spots, data])
    // Also update the back-up array after creating a new
    object.
    setUnfilteredSpots([...unfilteredSpots, data])
  }

  const readSpot = async (id) => {
    const response = await fetch(`${dbApiUrl}/spot/${id}`)
    const data = await response.json()

    return data
  }

  const updateSpot = async (id) => {
    const spotToUpdate = await readSpot(id)
    const spotUpdated = { ...spotToUpdate,
      name: spotToUpdate.name,
      country: spotToUpdate.country,
      lat: spotToUpdate.lat,
      long: spotToUpdate.long,
      probability: spotToUpdate.probability,
      month: spotToUpdate.month
    }
    const response = await fetch(`${dbApiUrl}/spot/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spotUpdated)
    })

    const data = await response.json()

    setSpots(
      spots.map((spot) =>
      spot.id === id ? { ...spot,
          name: data.name,
          country: data.country,
          lat: data.lat,
          long: data.long,
          probability: data.probability,
          month: data.month
        } : spot
      )
    )
  }

  const deleteSpot = async (id) => {
    const response = await fetch(`${dbApiUrl}/spot/${id}`, {
      method: 'DELETE'
    })

    setSpots(spots.filter((spot) => spot.id !== id))
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator initialRouteName='Index'>
          <Stack.Screen name='Index' options={({ navigation }) => ({
            headerRight: () => (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('User')}
                >
                  <Icon name="person" size={20} style={styles.button} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Filter')}
                >
                  <Icon name="filter-list" size={20} style={styles.button} />
                </TouchableOpacity>
              </View>
            )
          })}>
            {() =>
              <Index
                items={spots}
                createFavourite={createFavourite}
                deleteFavourite={deleteFavourite}
              />
            }
          </Stack.Screen>
          <Stack.Screen name='Item' options={({ route }) => ({
            title: route.params.name,
            headerRight: () =>
              <TouchableOpacity
                onPress={() => {route.params.favourite ? deleteFavourite(route.params.id) : createFavourite(route.params.id) }}
              >
                <Icon name={route.params.favourite ? 'star-border' : 'star'} size={24} style={route.params.favourite ? styles.actionRed : styles.actionBlue} />
              </TouchableOpacity>
          })}>
            {(spot) => <Item item={spot} />}
          </Stack.Screen>
          <Stack.Screen name='Filter'>
            {() =>
              <Filter
                spots={spots}
                setSpots={setSpots}
                unfilteredSpots={unfilteredSpots}
                sortArray={sortArray}
                removeDuplicates={removeDuplicates}
                filterCountry={filterCountry}
                setFilterCountry={setFilterCountry}
                filterProbability={filterProbability}
                setFilterProbability={setFilterProbability}
              />
            }
          </Stack.Screen>
          <Stack.Screen name='User'>
            {() =>
              <User setIsAuthenticated={setIsAuthenticated} storeIsAuthenticated={storeIsAuthenticated} />
            }
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name='Sign up'>
            {() =>
              <Register
                users={users}
                onAdd={createUser}
                fetchSession={fetchSession}
                setIsAuthenticated={setIsAuthenticated}
                storeIsAuthenticated={storeIsAuthenticated}
              />
            }
          </Stack.Screen>
          <Stack.Screen name='Log in'>
            {() =>
              <Login
                users={users}
                fetchSession={fetchSession}
                setIsAuthenticated={setIsAuthenticated}
                storeIsAuthenticated={storeIsAuthenticated}
              />
            }
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 12
  },
  button: {
    marginHorizontal: 12,
    color: 'black'
  },
  actionRed: {
    marginHorizontal: 16,
    color: '#FF4436'
  },
  actionBlue: {
    marginHorizontal: 16,
    color: '#0385FF'
  },
})

export default App
