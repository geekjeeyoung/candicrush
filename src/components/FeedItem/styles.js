import {StyleSheet} from 'react-native';
import AppStyles from '../../AppStyles';

const reactionIconSize = Math.floor(AppStyles.WINDOW_WIDTH * 0.09);
const imageWidth = 34;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      // width: Math.floor(AppStyles.WINDOW_WIDTH * 0.97),
      width: '100%',
      alignSelf: 'center',
      // marginVertical: 3,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    headerContainer: {
      flexDirection: 'row',
    },
    userImage: {
      width: imageWidth,
      height: imageWidth,
      borderRadius: Math.floor(imageWidth / 2),
      borderWidth: 0,
    },
    userImageContainer: {
      width: imageWidth,
      height: imageWidth,
      borderWidth: 0,
      margin: 2,
    },
    userImageMainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 6,
      marginTop: 10,
      justifyContent: 'center',
    },
    mainSubtitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    subtitleContainer: {
      flex: 1.3,
    },
    title: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14,
      fontWeight: '600',
    },
    subtitle: {
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      fontSize: 11,
    },
    body: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 12,
      lineHeight: 18,
      paddingBottom: 7,
      paddingHorizontal: 12,
    },
    moreText: {
      color: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 9,
      lineHeight: 18,
      paddingBottom: 15,
      paddingHorizontal: 12,
    },
    moreIconContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    moreIcon: {
      height: 18,
      width: 18,
      tintColor: AppStyles.colorSet[colorScheme].mainSubtextColor,
      margin: 0,
    },
    bodyTitleContainer: {
      marginHorizontal: 8,
    },
    bodyImageContainer: {
      height: AppStyles.WINDOW_HEIGHT * 0.5,
    },
    bodyImage: {
      height: '100%',
      width: '100%',
    },
    inactiveDot: {
      backgroundColor: 'rgba(255,255,255,.3)',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginLeft: 3,
      marginRight: 3,
    },
    activeDot: {
      backgroundColor: '#fff',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginLeft: 3,
      marginRight: 3,
    },
    reactionContainer: {
      flexDirection: 'row',
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      position: 'absolute',
      bottom: 2,
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.68),
      height: 48,
      borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.07),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 2,
    },
    reactionIconContainer: {
      margin: 3,
      padding: 0,
      backgroundColor: 'powderblue',
      width: reactionIconSize,
      height: reactionIconSize,
      borderRadius: reactionIconSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    reactionIcon: {
      width: reactionIconSize,
      height: reactionIconSize,
      margin: 0,
    },
    footerContainer: {
      flexDirection: 'row',
    },
    footerIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    footerIcon: {
      margin: 3,
      height: 25,
      width: 25,
    },
    mediaVideoLoader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    soundIconContainer: {
      position: 'absolute',
      // backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#000',
      width: 28,
      height: 28,
      borderRadius: 14,
      bottom: 3,
      right: 3,
      justifyContent: 'center',
      alignItems: 'center',
      // shadow generator
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    },
    soundIcon: {
      // tintColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      tintColor: '#fff',
      width: 15,
      height: 15,
    },
    tintColor: {tintColor: AppStyles.colorSet[colorScheme].mainTextColor},
  });
};

export default dynamicStyles;
