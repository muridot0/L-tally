import React from 'react';
import { Space } from '../models/space';
import { TallyCard } from '../models/tallyCard';
import { AuthService } from '../services/auth-service';
import { SpaceService } from '../services/space-service';
import { TallyService } from '../services/tally-service';
import { SpaceContext } from './space';

type User = {
  username: string;
  avatar: string;
  _id: string;
};

interface loginContextType {
  user: User | null;
  setUser: (user: User) => void;
  loggedIn: boolean;
  setLoggedIn: (id: boolean) => void;
  userSpaces: Space[] | null;
  setUserSpaces: (spaces: Space[]) => void;
  tallies: TallyCard[] | null;
  setTallies: (tallies: TallyCard[]) => void;
}

interface LoginProviderProps extends React.PropsWithChildren {}

const LoginContext = React.createContext<loginContextType>({
  user: { username: '', avatar: '', _id: '' },
  setUser: () => {
    throw new Error('Missing LoginContext provider');
  },
  loggedIn: false,
  setLoggedIn: () => {
    throw new Error('Missing LoginContext provider');
  },
  userSpaces: [{ userId: '', _id: '', spaceName: '', route: '', meta: '' }],
  setUserSpaces: () => {
    throw new Error('Missing LoginContext provider');
  },
  tallies: [{ _id: '', spaceId: '', tallyName: '', tallyNumber: 0 }],
  setTallies: () => {
    throw new Error('Missing LoginContext provider');
  }
});

function LoginProvider({ children }: LoginProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userSpaces, setUserSpaces] = React.useState<Space[] | null>(null);
  const [tallies, setTallies] = React.useState<TallyCard[] | null>(null);
  const { activeMenuItem } = React.useContext(SpaceContext);

  React.useEffect(() => {
    const getData = async () => {
      if(!user){
        return;
      }

      const spaces = window.localStorage.getItem('spaces');
      if (!spaces) {
        return;
      }
      const parsedSpaces = JSON.parse(spaces).data;
      if (parsedSpaces) {
        setUserSpaces(parsedSpaces);
      } else {
        setUserSpaces(
          await SpaceService.getSpacesByUserId(user._id).then((res: any) => {
            return res.data;
          })
        );
      }
    };
    getData();
  }, [user]);

  React.useEffect(() => {
    const getData = async () => {
      setTallies(
        await TallyService.getTallyBySpaceId(activeMenuItem).then(
          (res: any) => {
            return res.data;
          }
        )
      );
    };
    getData();
  }, [activeMenuItem, tallies]);

  React.useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
      if (!loggedInUser) {
        return;
      }
      setUser(AuthService.getCurrentUser().user)
  }, [setUser])

  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        userSpaces,
        setUserSpaces,
        tallies,
        setTallies
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export { LoginProvider, LoginContext };
export { type User };
