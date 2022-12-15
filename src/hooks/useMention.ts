import { useState } from 'react';

import { User } from 'types/User';

export const useMention = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const toggleMention = () => setIsStarted(!isStarted);

  const insertMention = (noteContent: string, user: User) => {
    const mentionStart = noteContent.lastIndexOf('@');
    const noteWithoutMention = noteContent.slice(0, mentionStart);
    return `${noteWithoutMention}@${user.username}`;
  };

  return { isMentionStarted: isStarted, toggleMention, insertMention };
};
