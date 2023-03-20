import { IUser, IChat } from 'monorepo-shared';

export const getTitleFromUsers = (users: IUser[], currentUserId?: string) => {
  const filteredUsers = users.filter(({ _id }) => _id !== currentUserId);
  const titleString = filteredUsers.reduce(
    (title, user) => title.concat(user.username),
    ''
  );

  return titleString;
};

export const getLastMessage = (chat: IChat) => {
  if (!chat.messages.length) return 'No messages yet';
  const lastMessage = chat.messages[chat.messages.length - 1];

  return `${lastMessage.user.username}: ${lastMessage.message}`;
};
