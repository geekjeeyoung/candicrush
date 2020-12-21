import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';

function Profile(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {uploadProgress, recentUserFeeds} = props;
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, {width: `${uploadProgress}%`}]} />
      {recentUserFeeds && <FlatList />}
    </View>
  );
}

export default Profile;
