import React from 'react';
import {Linking, Text, View} from 'react-native';
import {Localized} from '../../localization/Localization';

const TermsOfUseView = (props) => {
  const {tosLink, style} = props;
  return (
    <View style={[style, {opacity: 0.6}]}>
      <Text style={{fontSize: 12}}>
        {Localized('By creating an account you agree with our')}
      </Text>
      <Text
        style={{color: 'blue', fontSize: 12}}
        onPress={() => Linking.openURL(tosLink)}>
        {Localized('Terms of Use')}
      </Text>
    </View>
  );
};

export default TermsOfUseView;
