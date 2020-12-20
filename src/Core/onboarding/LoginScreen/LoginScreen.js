import React, {useState} from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {Localized} from '../../localization/Localization';
import {setUserData} from '../redux/auth';
import dynamicStyles from './styles';
import Button from 'react-native-button';
import {Alert} from 'react-native';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import authManager from '../utils/authManager';
import {localizedErrorMessage} from '../utils/ErrorCode';
const LoginScreen = (props) => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const appStyles =
    navigation.state.params.appStyles || navigation.getParams('appStyles');
  const appConfig =
    navigation.state.params.appConfig || navigation.getParams('appConfig');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const onPressLogin = () => {
    setLoading(true);
    authManager
      .loginWithEmailAndPassword(
        email && email.trim(),
        password && password.trim(),
      )
      .then((response) => {
        if (response.user) {
          const user = response.user;
          props.setUserData({user: user});
          navigation.navigate('MainStack', {user: user});
        } else {
          setLoading(false);
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{text: Localized('OK')}],
            {cancelable: false},
          );
        }
      });
  };

  const onFBButtonPress = () => {
    Alert.alert('onFBButtonPress');
  };

  const onKakaoButtonPress = () => {
    Alert.alert('onKakaoButtonPress');
  };

  const onNaverButtonPress = () => {
    Alert.alert('onNaverButtonPress');
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          onPress={() => navigation.goBack()}>
          <Image
            style={appStyles.styleSet.backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{Localized('Sign In')}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={Localized('E-mail')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry={true}
          placeholder={Localized('Password')}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}>
          {Localized('Log In')}
        </Button>
        <Text style={styles.orTextStyle}> {Localized('OR')}</Text>
        <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => onFBButtonPress()}>
          {Localized('Login With Facebook')}
        </Button>
        <Button
          containerStyle={[
            styles.facebookContainer,
            {backgroundColor: '#FFE90E'},
          ]}
          style={{color: '#3A1C1C'}}
          onPress={() => onKakaoButtonPress()}>
          {Localized('Login With KakaoTalk')}
        </Button>
        <Button
          containerStyle={[
            styles.facebookContainer,
            {backgroundColor: '#44C778'},
          ]}
          style={styles.facebookText}
          onPress={() => onNaverButtonPress()}>
          {Localized('Login With Naver')}
        </Button>
        {appConfig.isSMSAuthEnabled && (
          <Button
            containerStyle={styles.phoneNumberContainer}
            onPress={() =>
              navigation.navigate('Sms', {
                isSigningUp: false,
                appStyles,
                appConfig,
              })
            }>
            {Localized('Login with phone number')}
          </Button>
        )}

        {loading && <TNActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default connect(null, {setUserData})(LoginScreen);
