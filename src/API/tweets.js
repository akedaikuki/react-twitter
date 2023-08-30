import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

// const axiosInstance = axios.create({
//   baseURL: apiURL,
//   headers: { "Content-Type": "application/json" },
// });

export const getTweets = async (userToken) => {
  try {
    const res = await axios.get(`${apiURL}/tweets`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error("[Get Tweets failed]", error);
  }
};

export const userAddTweets = async (payload) => {
  const { description } = payload;
  const userToken = localStorage.getItem("userToken");
  try {
    const res = await axios.post(
      `${apiURL}/tweets`,
      { description },
      { headers: { Authorization: "Bearer " + userToken } }
    );
    return res.data;
  } catch (error) {
    console.error("[Create Tweets failed]: ", error);
  }
};

export const userReplyTweets = async (payload) => {
  const { comment, TweetId } = payload;
  const userToken = localStorage.getItem("userToken");
  try {
    const res = await axios.post(
      `${apiURL}/tweets/${TweetId}/replies`,
      { comment },
      { headers: { Authorization: "Bearer " + userToken } }
    );
    return res.data;
  } catch (error) {
    console.error("[Create Tweets failed]: ", error);
  }
};

export const userLikeTweet = async ({ userToken, TweetId }) => {
  try {
    const res = await axios.post(`${apiURL}/tweets/${TweetId}/like/`, null, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return res.data;
  } catch (error) {
    console.error("[LikeTweet failed]: ", error);
  }
};

export const userUnLikeTweet = async ({ userToken, TweetId }) => {
  try {
    const res = await axios.post(`${apiURL}/tweets/${TweetId}/unlike`, null, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return res.data;
  } catch (error) {
    console.error("[UnLikeTweet failed]: ", error);
  }
};
