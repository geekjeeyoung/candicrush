import React from 'react';
import {View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import StyleDict from '../../AppStyles';
import {Localized} from '../../Core/localization/Localization';
import DrawerItem from '../DrawerItem/DrawerItem';
import dynamicStyles from './styles';

function DrawerContainer(props) {
  const {navigation} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <DrawerItem
          title={Localized('Home')}
          source={StyleDict.iconSet.homeUnfilled}
          onPress={() => {
            navigation.navigate('Feed');
          }}
        />
      </View>
    </View>
  );
}

export default DrawerContainer;
