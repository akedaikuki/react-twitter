import { createContext, useState, useContext } from "react";

// import { useNavigate } from "react-router-dom";
const ShowModalContext = createContext();
export const useUserPostModal = () => useContext(ShowModalContext);

function ShowModalContextProvider({ children }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const toggleShowPostModal = () => {
    setShowPostModal(!showPostModal);
  };
  const [showReplyModal, setShowReplyModal] = useState(false);
  const toggleShowReplyModal = () => {
    setShowReplyModal(!showReplyModal);
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const toggleShowEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <ShowModalContext.Provider
      value={{
        showPostModal,
        setShowPostModal,
        toggleShowPostModal,
        showReplyModal,
        setShowReplyModal,
        toggleShowReplyModal,
        showEditModal,
        setShowEditModal,
        toggleShowEditModal,
      }}
    >
      {children}
    </ShowModalContext.Provider>
  );
}

export { ShowModalContext, ShowModalContextProvider };
