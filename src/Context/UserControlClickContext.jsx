import { createContext, useState } from "react";

const UserControlContext = createContext();

function UserControlContextProvider({ children }) {
  const [userActiveTab, setUserActiveTab] = useState("tweets");
  return (
    <UserControlContext.Provider
      value={{
        userActiveTab,
        setUserActiveTab,
      }}
    >
      {children}
    </UserControlContext.Provider>
  );
}

export { UserControlContext, UserControlContextProvider };
