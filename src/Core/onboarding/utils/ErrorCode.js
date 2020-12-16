import {Localized} from '../../localization/Localization';

export const ErrorCode = {
  passwordInUse: 'passwordInUse',
  badEmailFormat: 'badEmailFormat',
  emailInUse: 'emailInUse',
  invalidPassword: 'invalidPassword',
  noUser: 'noUser',
  rateLimited: 'rateLimited',
  serverError: 'serverError',
  photoUploadFailed: 'photoUploadFailed',
  fbAuthCancelled: 'fbAuthCancelled',
  fbAuthFailed: 'fbAuthFailed',
  smsNotSent: 'smsNotSent',
  invalidSMSCode: 'invalidSMSCode',
};

export const localizedErrorMessage = (errorCode) => {
  switch (errorCode) {
    case ErrorCode.passwordInUse:
      return Localized(
        'The password is invalid or the user does not have a password',
      );
    case ErrorCode.badEmailFormat:
      return Localized('The email address is badly formatted');
    case ErrorCode.emailInUse:
      return Localized(
        'The email address is already in use by another account.',
      );
    case ErrorCode.invalidPassword:
      return Localized('The given password is invalid');
    case ErrorCode.noUser:
      return Localized(
        'There is no user record corresponding to this identifier. The user may have been deleted.',
      );
    case ErrorCode.rateLimited:
      return Localized('Too many unsuccessful login attempts');
    case ErrorCode.photoUploadFailed:
      return Localized('Profile photo failed to upload');
    case ErrorCode.smsNotSent:
      return Localized(
        'The SMS was not sent due to an error. Please try again.',
      );
    case ErrorCode.invalidSMSCode:
      return Localized('The verification code is invalid. Please try again.');
    default:
      return Localized(
        'An error came up while logging you in. Please try again.',
      );
  }
};
