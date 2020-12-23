import {Localized} from '../../localization/Localization';

const FriendshipType = {
  none: 'none',
  inbound: 'inbound',
  outbound: 'outbound',
  reciprocal: 'reciprocal',
};

const localizedActionTitle = (friendshipType) => {
  switch (friendshipType) {
    case FriendshipType.none:
      return Localized('Add');
    case FriendshipType.inbound:
      return Localized('Accept');
    case FriendshipType.outbound:
      return Localized('Cancel');
    case FriendshipType.reciprocal:
      return Localized('Unfriend');
  }
  return null;
};

const localizedFollowActionTitle = (friendshipType) => {
  switch (friendshipType) {
    case FriendshipType.none:
      return Localized('Follow');
    case FriendshipType.inbound:
      return Localized('Follow back');
    case FriendshipType.outbound:
      return Localized('Unfollow');
    case FriendshipType.reciprocal:
      return Localized('Unfollow');
  }
  return null;
};

export const FriendshipConstants = {
  localizedActionTitle,
  localizedFollowActionTitle,
  FriendshipType,
};
