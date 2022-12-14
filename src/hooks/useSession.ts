import { useRandomUUID } from 'hooks/useRandomUUID';

export const useSession = () => {
  let sessionId = localStorage.getItem('sessionId');
  const generateUUID = useRandomUUID();

  if (sessionId == null) {
    sessionId = generateUUID();
    localStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
};
