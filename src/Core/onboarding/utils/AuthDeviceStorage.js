import AsyncStorage from '@react-native-async-storage/async-storage';

const SHOULD_SHOW_ONBOARDING_FLOW = 'SHOULD_SHOW_ONBOARDING_FLOW';

const getShouldShowOnboardingFlow = async () => {
  try {
    const result = await AsyncStorage.getItem(SHOULD_SHOW_ONBOARDING_FLOW);
    return result !== null ? false : true;
  } catch (err) {
    console.log(err);
  }
};

const setShouldShowOnboardingFlow = async (value) => {
  try {
    await AsyncStorage.setItem(SHOULD_SHOW_ONBOARDING_FLOW, value);
  } catch (err) {
    console.log(err);
  }
};

const authDeviceStorage = {
  getShouldShowOnboardingFlow,
  setShouldShowOnboardingFlow,
};

export default authDeviceStorage;
