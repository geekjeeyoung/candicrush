import {decode, encode} from 'base-64';
import React, {useEffect, useState} from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import * as RNLocalize from 'react-native-localize';
import {MenuProvider} from 'react-native-popup-menu';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {setI18nConfig} from './Core/localization/Localization';
import configureStore from './redux/store';
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
    LogBox.ignoreAllLogs(true); // ignore all the unsignificant errors
    setI18nConfig();
    RNLocalize.addEventListener('change', handleLocalizationChange);
    Appearance.addChangeListener(({colorScheme}) => {
      setColorScheme(colorScheme);
    });

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig();
  };

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

App.propTypes = {};

App.defaultProps = {};

AppRegistry.registerComponent('App', () => App);

export default App;
