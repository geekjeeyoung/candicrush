import CHUserReportingActionsConstants from './types';

const initialState = {
  bannedUserIDs: null,
};

export const userReports = (state = initialState, action) => {
  switch (action.type) {
    case CHUserReportingActionsConstants.SET_BANNED_USER_IDS:
      return {...state, bannedUserIDs: [...action.data]};
    default:
      return state;
  }
};
