import React from "react";

type UserSessionProps = {
  user: any;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  handleDisconnect: () => void;
};

const UserContext = React.createContext<UserSessionProps>({
  user: {},
  setUser: () => { },
  setToken: () => { },
  handleDisconnect: () => { },
});

export const useUserContext = () => React.useContext(UserContext);

export const UserProvider = ({ ...props }) => {
  const { children } = props;
  const [user, setUser] = React.useState({});

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    console.log(token);
  };

  const handleDisconnect = () => {
    setUser({});
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setToken,
        handleDisconnect,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
