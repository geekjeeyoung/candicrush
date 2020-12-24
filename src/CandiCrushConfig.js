import AppStyles from './AppStyles';
import {Localized} from './Core/localization/Localization';

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;

const CandiCrushConfig = {
  isSMSAuthEnabled: false,
  appIdentifier: 'rn-candicrush',
  onboardingConfig: {
    welcomeTitle: Localized('Welcome to CandiCrush'),
    welcomeCaption: Localized('New joy and excitement await you.'),
    walkthroughScreens: [
      {
        key: 's1',
        description1: Localized('Have fun with your friends '),
        description2: Localized('by posting cool photos and videos'),
        title: Localized('Share Photos & Videos'),
        image: require('../assets/images/onboarding-camera.png'),
        backgroundColor: '#BC475A',
      },
      {
        key: 's2',
        title: Localized('Stories'),
        description1: Localized('Share stories of your lovely day '),
        description2: Localized('It disappear after 24h'),
        image: require('../assets/images/book.png'),
        backgroundColor: '#4a5759',
      },
      {
        key: 's3',
        title: Localized('Messages'),
        description1: Localized('Communicate with your friends '),
        description2: Localized('via private messages'),
        image: require('../assets/images/typing.png'),
        backgroundColor: '#28666e',
      },
      {
        key: 's4',
        title: Localized('Group Chats'),
        description1: Localized('Stay in touch with your friends '),
        description2: Localized('in private group chats'),
        image: require('../assets/images/onboarding-dolls.png'),
        backgroundColor: '#6b9080',
      },
      {
        key: 's5',
        title: Localized('Checkins'),
        description1: Localized('Check in when posting '),
        description2: Localized('to share your location with friends'),
        image: require('../assets/images/onboarding-compass.png'),
        backgroundColor: '#585123',
      },
      {
        key: 's6',
        title: Localized('Get Notified'),
        description1: Localized('Receive notifications '),
        description2: Localized('when you get new messages and likes'),
        image: require('../assets/images/onboarding-alarm.png'),
        backgroundColor: '#363636',
      },
    ],
  },
  tabIcons: {
    Feed: {
      focus: AppStyles.iconSet.homefilled,
      unFocus: AppStyles.iconSet.homeUnfilled,
    },
    Discover: {
      focus: AppStyles.iconSet.search,
      unFocus: AppStyles.iconSet.search,
    },
    Chat: {
      focus: AppStyles.iconSet.commentFilled,
      unFocus: AppStyles.iconSet.commentUnfilled,
    },
    Friends: {
      focus: AppStyles.iconSet.friendsFilled,
      unFocus: AppStyles.iconSet.friendsUnfilled,
    },
    Profile: {
      focus: AppStyles.iconSet.profileFilled,
      unFocus: AppStyles.iconSet.profileUnfilled,
    },
  },
  //   tosLink: 'https://www.instamobile.io/eula-instachatty/',
  tosLink: 'https://www.chezcandy.fun/',
  editProfileFields: {
    sections: [
      {
        title: Localized('PUBLIC PROFILE'),
        fields: [
          {
            displayName: Localized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: Localized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: Localized('Your last name'),
          },
        ],
      },
      {
        title: Localized('PRIVATE DETAILS'),
        fields: [
          {
            displayName: Localized('E-mail Address'),
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: Localized('Your email address'),
          },
          {
            displayName: Localized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: Localized('Your phone number'),
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: Localized('GENERAL'),
        fields: [
          {
            displayName: Localized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: false,
          },
          {
            displayName: Localized('Enable Face ID / Touch ID'),
            type: 'switch',
            editable: true,
            key: 'face_id_enabled',
            value: false,
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: Localized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: Localized('CONTACT'),
        fields: [
          {
            displayName: Localized('Address'),
            type: 'text',
            editable: false,
            key: 'contactus',
            value: 'Rue Gutenberg, 75015 Paris, France',
          },
          {
            displayName: Localized('E-mail us'),
            value: 'welcome.chezcandy@gmail.com',
            type: 'text',
            editable: false,
            key: 'email',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: Localized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '',
};

export default CandiCrushConfig;
