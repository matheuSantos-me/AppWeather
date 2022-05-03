import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  useColorScheme,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';

import {
  ButtonReload,
  PickerTemperatureScales,
  WeatherDetails,
  WeatherInfo,
} from './components';
import {colors} from './utils/colors';

const {PRIMARY_COLOR} = colors;

interface IStateWeatherDetails {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {deg: number; gust: number; speed: number};
}

interface IStateAddress {
  country: string;
  name: string;
  state: string;
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState<
    IStateWeatherDetails | undefined
  >();
  const [unitsSystem, setUnitsSystem] = useState<string>('metric');
  const [address, setAddress] = useState<IStateAddress | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAddressByLocation = async (latitude: number, longitude: number) => {
    try {
      const {data} = await Axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=ecb9f6a03014b6843e398f76dbe11ec9`,
      );
      setAddress(data[0]);
    } catch (e) {
      console.log(e, 'error');
      Alert.alert('Error', 'Error ao pegar o endereço.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByLocation = async (latitude: number, longitude: number) => {
    try {
      const {data} = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=ecb9f6a03014b6843e398f76dbe11ec9`,
      );
      setCurrentWeatherDetails({
        main: data.main,
        weather: data.weather,
        wind: data.wind,
      });
    } catch (e) {
      Alert.alert(
        'Error',
        'Error ao pegar as informações de clima da sua região.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReloadWeather = async () => {
    setLoading(true);

    Geolocation.getCurrentPosition(
      async ({coords}) => {
        await getAddressByLocation(coords.latitude, coords.longitude);
        await getWeatherByLocation(coords.latitude, coords.longitude);
      },
      error => Alert.alert('Error', JSON.stringify(error.message)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useMemo(() => {
    setLoading(true);
    handleReloadWeather();
  }, [unitsSystem]);

  if (currentWeatherDetails && !loading) {
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
            currentWeatherDetails={currentWeatherDetails}
            address={address}
          />
        </View>

        <WeatherDetails
          currentWeatherDetails={currentWeatherDetails}
          unitsSystem={unitsSystem}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }
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
    marginTop: Platform.OS === 'ios' ? -40 : 0,
  },
});

export default App;
