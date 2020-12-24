import {StyleSheet, Platform} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: 'white',
    },
    text: {
      fontSize: Platform.OS === 'ios' ? 16 : 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: Platform.OS === 'ios' ? 280 : 300,
      height: Platform.OS === 'ios' ? 230 : 250,
      marginBottom: 60,
      // tintColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    button: {
      fontSize: 16,
      color: 'white',
      marginTop: 10,
    },
  });
};

export default dynamicStyles;
