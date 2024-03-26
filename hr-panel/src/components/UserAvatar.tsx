import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { FC } from "react";
import { FragmentType, gql, useFragment } from "../lib/gql-codegen";

export const AvatarFragment = gql(/* GraphQL */`
  fragment Avatar on User {
    profileIconUrl
    firstName
  }
`);

export interface UserAvatarProps extends AvatarProps {
  readonly user: FragmentType<typeof AvatarFragment>;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  const avatarFragment = useFragment(AvatarFragment, user);
  return <Avatar {...props} src={avatarFragment.profileIconUrl ?? undefined} alt={`${avatarFragment.firstName}'s profile picture`} />;
};

export default UserAvatar;
