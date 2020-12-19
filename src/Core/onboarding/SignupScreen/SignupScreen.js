import React, {useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import Button from 'react-native-button';
import {useColorScheme} from 'react-native-appearance';
import dynamicStyles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Localized} from '../../localization/Localization';
import TermsOfUseView from '../components/TermsOfUseView';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import TNProfilePictureSelector from '../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector';
import {localizedErrorMessage} from '../utils/ErrorCode';
import {connect} from 'react-redux';
import {setUserData} from '../redux/auth';
import authManager from '../utils/authManager';

const SignupScreen = (props) => {
  const {navigation} = props;
  const appConfig =
    navigation.state.params.appConfig || navigation.getParam('appConfig');
  const appStyles =
    navigation.state.params.appStyles || navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = () => {
    setLoading(true);

    const userDetails = {
      firstName,
      lastName,
      email: email && email.trim(),
      password: password && password.trim(),
      profilePictureURL,
      appIdentifier: appConfig.appIdentifier,
    };
    authManager
      .createAccountWithEmailAndPassword(userDetails)
      .then((response) => {
        const user = response.user;
        if (user) {
          props.setUserData({
            user: response.user,
          });
          props.navigation.navigate('MainStack', {user: user});
        } else {
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{text: Localized('OK')}],
            {
              cancelable: false,
            },
          );
        }
        setLoading(false);
      });
  };

  const renderSignupWithEmail = () => {
    return (
      <>
        <TextInput
          style={styles.InputContainer}
          placeholder={Localized('First Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={Localized('Last Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={Localized('E-mail Address')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={Localized('Password')}
          placeholderTextColor="#aaaaaa"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() => onRegister()}>
          {Localized('Sign Up')}
        </Button>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={appStyles.iconSet.backArrow}
            style={appStyles.styleSet.backArrowStyle}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{Localized('Create new account')}</Text>
        <TNProfilePictureSelector
          setProfilePictureURL={setProfilePictureURL}
          appStyles={appStyles}
        />
        {renderSignupWithEmail()}
        {appConfig.isSMSAuthEnabled && (
          <>
            <Text style={styles.orTextStyle}>{Localized('OR')}</Text>
            <Button
              containerStyle={styles.PhoneNumberContainer}
              onPress={() =>
                navigation.navigate('Sms', {
                  isSigningUp: true,
                  appStyles,
                  appConfig,
                })
              }>
              {Localized('Sign up with phone number')}
            </Button>
          </>
        )}
        <TermsOfUseView style={styles.tos} tosLink={appConfig.tosLink} />
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator />}
    </View>
  );
};

export default connect(null, {setUserData})(SignupScreen);
