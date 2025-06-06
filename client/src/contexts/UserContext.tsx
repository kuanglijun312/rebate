import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';
import type { IUser } from '../interface/model';
import { getProfile } from '../api/user';

type UserContextType = {
  user: IUser | null;
  isInAuth: boolean;
  updateUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isInAuth, setIsInAuth] = useState<boolean>(false);
  const updateUser = async () => {
    setIsInAuth(true);
    try {
      const res = await getProfile();
      if (res.code === 200) {
        setUser(res.data);
      }
    } finally {
      setIsInAuth(false);
    }
  }

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isInAuth, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};