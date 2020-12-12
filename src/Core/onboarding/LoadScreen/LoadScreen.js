import React from 'react';
import {View, Text} from 'react-native';

const LoadScreen = (props) => {
  const {navigation} = props;
  if (1 === 0) {
    navigation.navigate('Walkthrough');
  }
  return (
    <View>
      <Text>Load</Text>
    </View>
  );
};

export default LoadScreen;
