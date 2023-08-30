import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

// const axiosInstance = axios.create({
//   baseURL: apiURL,
//   headers: { "Content-Type": "application/json" },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("UserToken");
//     console.log(token);
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error(error);
//   }
// );
//取得前台所有推文
// export const getAllTweets = async ({ token }) => {
//   try {
//     const { data } = await axios.get(`${apiURL}/tweets`, {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     return { data };
//   } catch (error) {
//     console.log(error);
//   }
// };

// get tweets api
// export const getTweets = async () => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/tweets`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get Tweets failed]:", error);
//   }
// };

// // post tweets api
// export const postTweets = async ({ description }) => {
//   try {
//     const res = await axiosInstance.post(`${apiURL}/tweets`, {
//       description,
//     });
//     return res.data;
//   } catch (error) {
//     console.error("[Post Tweets failed]:", error);
//     throw error;
//   }
// };

// // get tweet_id api
// export const getTweetId = async ({ tweet_id }) => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/tweets/${tweet_id}`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get Tweet_id failed]:", error);
//   }
// };

// // get tweets_id replies api
// export const getReplies = async ({ tweet_id }) => {
//   try {
//     const res = await axiosInstance.get(`${apiURL}/tweets/${tweet_id}/replies`);
//     return res.data;
//   } catch (error) {
//     console.error("[Get Tweets_id replies failed]:", error);
//   }
// };

export const getTweets = async (authToken) => {
  try {
    const res = await axios.get(`${apiURL}/tweets`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    return res.data;
  } catch (error) {
    console.error("[Get Tweets failed]", error);
  }
};

export const userAddTweets = async (payload) => {
  const { description } = payload;
  const authToken = localStorage.getItem("authToken");
  try {
    const res = await axios.post(
      `${apiURL}/tweets`,
      { description },
      { headers: { Authorization: "Bearer " + authToken } }
    );
    return res.data;
  } catch (error) {
    console.error("[Create Tweets failed]: ", error);
  }
};

export const userReplyTweets = async (payload) => {
  const { comment, TweetId } = payload;
  const authToken = localStorage.getItem("authToken");
  try {
    const res = await axios.post(
      `${apiURL}/tweets/${TweetId}/replies`,
      { comment },
      { headers: { Authorization: "Bearer " + authToken } }
    );
    return res.data;
  } catch (error) {
    console.error("[Create Tweets failed]: ", error);
  }
};

export const userLikeTweet = async ({ authToken, TweetId }) => {
  try {
    const res = await axios.post(`${apiURL}/tweets/${TweetId}/like/`, null, {
      headers: { Authorization: "Bearer " + authToken },
    });
    return res.data;
  } catch (error) {
    console.error("[LikeTweet failed]: ", error);
  }
};

export const userUnLikeTweet = async ({ authToken, TweetId }) => {
  try {
    const res = await axios.post(`${apiURL}/tweets/${TweetId}/unlike`, null, {
      headers: { Authorization: "Bearer " + authToken },
    });
    return res.data;
  } catch (error) {
    console.error("[UnLikeTweet failed]: ", error);
  }
};
