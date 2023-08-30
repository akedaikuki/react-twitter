import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

// const axiosInstance = axios.create({
//   baseURL: apiURL,
//   headers: { "Content-Type": "application/json" },
// });


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
