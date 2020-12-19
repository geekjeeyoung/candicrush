import {StyleSheet} from 'react-native';
import StyleDict from '../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: StyleDict.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
      paddingHorizontal: 20,
    },
  });
};

export default dynamicStyles;
