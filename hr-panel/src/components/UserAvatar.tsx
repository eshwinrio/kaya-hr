import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { FC } from "react";
import { User } from "../lib/gql-codegen/graphql";

export interface UserAvatarProps extends AvatarProps {
  readonly user: User;
  src?: never;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return <Avatar {...props} src={user.profileIconUrl ?? undefined} alt={`${user.firstName}'s profile picture`} />;
};

export default UserAvatar;
