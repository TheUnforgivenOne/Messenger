import { IUser } from 'monorepo-shared';

export const getTitleFromUsers = (users: IUser[], currentUserId?: string) => {
  const filteredUsers = users.filter(({ _id }) => _id !== currentUserId);
  const titleString = filteredUsers.reduce(
    (title, user) => title.concat(user.username),
    ''
  );

  return titleString;
};
