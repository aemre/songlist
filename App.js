/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import  SoundListScreen  from './src/screen/SoundListScreen';
import { Provider as ReduxProvider } from 'react-redux'
import createStore  from './src/reduxstore/store/createStore'

const store = createStore();

const App: () => Node = () => {



  const isDarkMode = useColorScheme() === 'dark';

  const darkTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1A1A1A",
      accent: "#FAFAFA"
    },
  };

  const lightTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#FAFAFA",
      accent: "#1A1A1A",
    },
  };

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <SoundListScreen />
      </PaperProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
