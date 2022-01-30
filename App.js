import React from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>서울</Text>
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
