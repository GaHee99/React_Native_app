import * as Location from 'expo-location'
import { LocationAccuracy } from 'expo-location'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const API_KEY = '1b6b1531870d8debb0aae03c9177a4b7'
export default function App() {
  const [city, setCity] = useState('Loading..')
  const [days, setDays] = useState([])
  const [ok, setOk] = useState(true)

  const getWeather = async () => {
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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`,
    )
    const json = await response.json()
    setDays(json.daily)
  }
  //Component가 mount되면 use Effect을 통해서 ask function을 호출
  useEffect(() => {
    getWeather()
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
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
  temp: { fontSize: 100, marginTop: 40 },
  description: { fontSize: 50, marginTop: -20 },
  tinyText: {
    fontSize: 20,
  },
})
