import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  indicatorContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginBottom: 20,
  },
});

export default styles;
