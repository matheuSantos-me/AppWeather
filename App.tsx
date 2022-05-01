import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Icon name="rocket" size={30} color="#900" />
      <Text>oiiooiioio</Text>
    </SafeAreaView>
  );
};

export default App;
