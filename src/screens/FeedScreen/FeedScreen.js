import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Feed} from '../../components';
import styles from './styles';

const FeedScreen = (props) => {
  const currentUser = useSelector((state) => {
    state.auth.user;
  });

  return (
    <View style={styles.container}>
      <Feed />
    </View>
  );
};

export default FeedScreen;
