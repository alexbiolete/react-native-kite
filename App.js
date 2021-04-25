import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
} from 'react-native'
import { dbApiUrl } from './App/config'
import Index from './Views/Index'
import Item from './Views/Item'
import Filter from './Views/Filter'

const App = () => {
  const [authenticatedUserName, setAuthenticatedUserName] = useState('')
  const [users, setUsers] = useState([])
  const [spots, setSpots] = useState([])
  const [unfilteredSpots, setUnfilteredSpots] = useState([])
  const [favourites, setFavourites] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [filterProbability, setFilterProbability] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUsers(usersFromServer)
    }

    getUsers()
  }, [])

  useEffect(() => {
    const getFavourites = async () => {
      const favouritesFromServer = await fetchFavourites()
      setFavourites(favouritesFromServer)
    }

    getFavourites()
  }, [])

  useEffect(() => {
    const getSpots = async () => {
      const spotsFromServer = await fetchSpots()

      // Assign a 'favourite' field (bool) for each Spot element
      // and set it to true if the id corresponds to any
      // spot value from each Favourite element.
      spotsFromServer.forEach((spot) => {
        spot.favourite = favourites.some((favourite) => {
          return spot.id === favourite.spot.toString()
        })
      })

      setSpots(spotsFromServer)
      // Set a back-up array to restore the main one after
      // removing filters.
      setUnfilteredSpots(spotsFromServer)
    }

    getSpots()
  }, [favourites])

  const fetchSession = async (user) => {
    const response = await fetch(`${dbApiUrl}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()

    return data.userId.toString()
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

    // Set user data locally to simulate a user session
    // after registration.
    localStorage.setItem('userId', fetchSession(user).userId)
    localStorage.setItem('userName', user.name)
    setAuthenticatedUserName(user.name)

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
    // object.
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
    <SafeAreaView>
      {/* Pages */}
      <Index items={spots} />
      {/* <Item item={items[0]} /> */}
      {/* <Filter /> */}
      {/* Expo status bar */}
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default App
