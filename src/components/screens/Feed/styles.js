import {StyleSheet} from 'react-native';
import StyleDict from '../../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    feedContainer: {
      flex: 1,
      backgroundColor: StyleDict.colorSet[colorScheme].whiteSmoke,
    },
    emptyStateView: {
      marginTop: 80,
    },
  });
};

export default dynamicStyles;
