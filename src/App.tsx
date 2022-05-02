import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  useColorScheme,
  StyleSheet,
} from 'react-native';

import {
  ButtonReload,
  PickerTemperatureScales,
  WeatherDetails,
  WeatherInfo,
} from './components';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState<string>('metric');

  // const [coords, setCoords] = useState({
  //   lat: 0,
  //   lng: 0
  // })

  // Geolocation.getCurrentPosition(({ coords }) => setCoords({
  //   lat: coords.latitude,
  //   lng: coords.longitude
  // }));

  // const getTeste = async () => {
  //   await Geocoder.fallbackToGoogle('AIzaSyAhulp9FGeSBho-FehczJYYIVssxA8FfLs');

  //   try {
  //     let ret = await Geocoder.geocodePosition(coords)
  //     console.log(ret, 'ret')
  //   } catch (e) {
  //     console.log(e, 'error de position')
  //   }
  // }

  // useEffect(() => { getTeste() }, [])

  const handleReloadWeather = () => {};

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.main}>
        <PickerTemperatureScales
          unitsSystem={unitsSystem}
          setUnitsSystem={setUnitsSystem}
        />

        <ButtonReload action={handleReloadWeather} />

        <WeatherInfo
          currentWeather={currentWeather}
          currentWeatherDetails={currentWeatherDetails}
        />
      </View>

      <WeatherDetails
        currentWeather={currentWeather}
        currentWeatherDetails={currentWeatherDetails}
        unitsSystem={unitsSystem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
