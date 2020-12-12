import {decode, encode} from 'base-64';
import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import {MenuProvider} from 'react-native-popup-menu';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import configureStore from './redux/store/prod';
import AppContainer from './screens/AppContainer';

const store = configureStore();
const MainNavigator = AppContainer;

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const App = (props) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  enableScreens(); // optimization for navigations

  useEffect(() => {
    LogBox.ignoreAllLogs(true);

    Appearance.addChangeListener(({colorScheme}) => {
      setColorScheme(colorScheme);
    });
  }, []);

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <MenuProvider>
          <MainNavigator screenProps={{theme: colorScheme}} />
        </MenuProvider>
      </AppearanceProvider>
    </Provider>
  );
};

export default App;
