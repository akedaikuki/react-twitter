// import { createContext, useState, useContext } from "react";

// const defaultTweetContext = {
//   isReplyDataUpdate: false,
//   isUserDataUpdate: false,
//   isTweetDataUpdate: false,
// };

// //
// const TweetDataContext = createContext(defaultTweetContext);
// const useTweetData = () => useContext(TweetDataContext);

// //
// function TweetDataProvider({ children }) {
//   const [isUserDataUpdate, setIsUserDataUpdate] = useState(true);
//   const [isTweetDataUpdate, setIsTweetDataUpdate] = useState(true);
//   const [isReplyDataUpdate, setIsReplyDataUpdate] = useState(true);

//   return (
//     <TweetDataContext.Provider
//       value={{
//         isUserDataUpdate,
//         setIsUserDataUpdate,
//         isTweetDataUpdate,
//         setIsTweetDataUpdate,
//         isReplyDataUpdate,
//         setIsReplyDataUpdate,
//       }}
//     >
//       {children}
//     </TweetDataContext.Provider>
//   );
// }

// export { useTweetData, TweetDataProvider };
