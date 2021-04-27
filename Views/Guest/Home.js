import React from 'react'
import { useLayoutEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useFonts, Calligraffitti_400Regular } from '@expo-google-fonts/calligraffitti'

const Home = () => {
  const navigation = useNavigation()
  let [fontsLoaded] = useFonts({
    Calligraffitti_400Regular,
  });

  return (
    <View style={styles.splash}>
      <View>
        <Text style={fontsLoaded ? styles.logoStyled : styles.logo}>
          Kite
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => {
            navigation.navigate('Log in')
          }}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => {
            navigation.navigate('Sign up')
          }}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '60%'
  },
  logo: {
    padding: 32,
    fontSize: 72,
  },
  logoStyled: {
    padding: 32,
    fontSize: 72,
    fontFamily: 'Calligraffitti_400Regular'
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  buttonPrimary: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#000',
    alignItems: 'center'
  },
  buttonSecondary: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#111',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 24
  }
})

export default Home
