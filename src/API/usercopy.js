import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

// const userId = localStorage.getItem("userID");

// const axiosInstance = axios.create({
//   baseURL: apiURL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("UserToken");
//     if (token) {
//       config.headers["Authorization"] = `Bear ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error(error);
//   }
// );

// get users tweets
// -- 許多頁取得使用者資料
export const getAccountInfo = async (userToken, id) => {
  try {
    const { data } = await axios.get(`${apiURL}/users/${id}/tweets`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[getAccountInfo failed]", error);
  }
};

// export const getUserTweets = async () => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/users/${userId}/tweets`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get UserTweets failed]:", error);
//   }
// };

// // get users replied
// export const getUserReplied = async () => {
//   try {
//     const res = await axiosInstance.get(
//       `${apiURL}/users/${userId}/replied_tweets`
//     );
//     return res.data;
//   } catch (error) {
//     console.error("[Get UserReplied failed]:", error);
//   }
// };

// // get users likes
// export const getUserLikes = async () => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/users/${userId}/likes`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get UserLikes failed]:", error);
//   }
// };

// //get users followings
// export const getUserFollowings = async () => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/users/${userId}/followings`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get UserFollowings failed]:", error);
//   }
// };

// //get users followers
// export const getUserFollowers = async () => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/users/${userId}/followers`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get UserFollowers failed]:", error);
//   }
// };

// //get users id
// export const getUser = async () => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/users/${userId}`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get UserId failed]:", error);
//   }
// };

// // -- Other頁面取得 Other 資料
// // -- follow 頁取得 follower 資料
// export const getUserFollowers = async (authToken, id) => {
//   try {
//     const { data } = await axios.get(`${baseURL}/users/${id}/followers`, {
//       headers: { Authorization: "Bearer " + authToken },
//     });
//     return data;
//   } catch (error) {
//     console.error("[getUserFollowers failed]", error);
//   }
// };

// // -- follow 頁取得 following 資料
// export const getUserFollowing = async (authToken, id) => {
//   try {
//     const { data } = await axios.get(`${baseURL}/users/${id}/followings`, {
//       headers: { Authorization: "Bearer " + authToken },
//     });
//     return data;
//   } catch (error) {
//     console.error("[getUserFollowings failed]", error);
//   }
// };
