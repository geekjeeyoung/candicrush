// ======== constants ========
const SET_CHANNELS = 'SET_CHANNELS';
const SET_CHANNELS_SUBSCRIBED = 'SET_CHANNELS_SUBSCRIBED';

// ======== actions ========
export const setChannels = (data) => ({
  type: SET_CHANNELS,
  data,
});

export const setChannelsSubscribed = (data) => ({
  type: SET_CHANNELS_SUBSCRIBED,
  data,
});

// ======== chat reducer =========
const initialState = {
  channels: null,
  areChannelsSubscribed: false,
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return {
        ...state,
        channels: [...action.data],
      };
    case SET_CHANNELS_SUBSCRIBED:
      return {
        ...state,
        areChannelsSubscribed: action.data,
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};
