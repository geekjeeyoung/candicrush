# candicrush - photo sharing app

- LoginStack 만들기 (Signup -> Login -> Sms)
- phone authentication 처리하기

## TO DO LIST

- 나머지 Login features 처리하기 (Login Page 만들기)
- React Native Firebase 공식 문서를 함께 보면서 처리하기
- password hashing
- React Native Navigation 업데이트 디펜던시 사용해보기 (CreateSwitchNav 가 없음)

====================

- SMS Auth 기능은 나중에 추가하기

<br/>

# **Profile Screen 만들기**

- CREATE POST
- handleSuccessfulLogin 다루기(with location)

- CHLocationSelectorModal 만들기 (map API)

- firebaseAuth.fetchAndStorePushTokenIfPossible(user) 만들기 (firebase messaging 필요함)

<br/>

## iOS Info.plist - permission list

<!-- 🚨 Keep only the permissions used in your app 🚨 -->

<key>NSAppleMusicUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSBluetoothAlwaysUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSCalendarsUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSCameraUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSContactsUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSFaceIDUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSLocationTemporaryUsageDescriptionDictionary</key>
<dict>
<key>YOUR-PURPOSE-KEY</key>
<string>YOUR TEXT</string>
</dict>
<key>NSLocationWhenInUseUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSMicrophoneUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSMotionUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSRemindersUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSSiriUsageDescription</key>
<string>YOUR TEXT</string>
<key>NSUserTrackingUsageDescription</key>
<string>YOUR TEXT</string>

  <!-- … -->
