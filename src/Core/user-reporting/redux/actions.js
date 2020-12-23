import CHUserReportingActionsConstants from './types';

export const setBannedUserIDs = (data) => ({
  type: CHUserReportingActionsConstants.SET_BANNED_USER_IDS,
  data,
});
