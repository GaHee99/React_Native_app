import * as Location from 'expo-location'
import { LocationAccuracy } from 'expo-location'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function App() {
  const [city, setCity] = useState('Loading..')
  const [location, setLocation] = useState()
  const [ok, setOk] = useState(true)
  const ask = async () => {
    const granted = await Location.requestForegroundPermissionsAsync()
    if (!granted) {
      setOk(false)
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 })
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    )
    setCity(location[0].city)
  }
  //Component가 mount되면 use Effect을 통해서 ask function을 호출
  useEffect(() => {
    ask()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        pagingEnabled
        horizontal
        ContentContainerstyle={styles.wether}
        indicatorStyle="white"
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 68,
    fontWeight: '500',
  },
  wether: {
    backgroundColor: 'blue',
  },
  day: {
    width: SCREEN_WIDTH,
    fontWeight: '800',
    alignItems: 'center',
  },
  temp: { fontSize: 178, marginTop: 40 },
  description: { fontSize: 50, marginTop: -20 },
})
