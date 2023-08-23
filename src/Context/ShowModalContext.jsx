import { createContext, useState } from "react";

const ShowModalContext = createContext();

function ShowModalContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ShowModalContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </ShowModalContext.Provider>
  );
}

export { ShowModalContext, ShowModalContextProvider };
