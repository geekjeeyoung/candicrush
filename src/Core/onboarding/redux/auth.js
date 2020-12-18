const UPDATE_USER = 'UPDATE_USER';

export const DUMMY_USER_DATA = {
  id: '3783873893993783',
  profilePictureURL:
    'https://pbs.twimg.com/media/ESy06uDU4AAhhMe?format=jpg&name=large',
  firstName: 'Wei',
  lastName: 'Tang',
};

export const setUserData = (data) => ({
  type: UPDATE_USER,
  data,
});

const initialState = {
  user: DUMMY_USER_DATA,
  users: [],
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.data.user,
      };

    default:
      return state;
  }
};
