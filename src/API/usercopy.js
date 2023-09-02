import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

export const getTweets = async (userToken) => {
  try {
    const res = await axios.get(`${apiURL}/tweets`, {
      headers: { Authorization: "Bearer " + userToken },
    });
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
    const res = await axios.post(
      `${apiURL}/tweets/${TweetId}/like`,
      null,

      {
        headers: { Authorization: "Bearer " + userToken },
      }
    );
    return res.data;
  } catch (error) {
    console.error("[LikeTweet failed]: ", error);
  }
};

export const userUnLikeTweet = async ({ userToken, TweetId }) => {
  try {
    const res = await axios.post(
      `${apiURL}/tweets/${TweetId}/unlike`,
      null,

      {
        headers: { Authorization: "Bearer " + userToken },
      }
    );
    return res.data;
  } catch (error) {
    console.error("[UnLikeTweet failed]: ", error);
  }
};

// 個人資料頁底下的推文串
export const getUserTweets = async (userToken, id) => {
  try {
    const res = await axios.get(`${apiURL}/users/${id}/tweets `, {
      headers: { Authorization: "Bearer " + userToken },
    });

    return res.data;
  } catch (error) {
    console.error("[Get UserTweets failed]", error);
  }
};

// 個人資料頁底下的回覆串
export const getUserReplyTweets = async (userToken, id) => {
  try {
    const res = await axios.get(`${apiURL}/users/${id}/replied_tweets `, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return res.data;
  } catch (error) {
    console.error("[Get UserReplyTweets failed]", error);
  }
};

// 個人資料頁底下的喜歡串
export const getUserLikeTweets = async (userToken, id) => {
  try {
    const res = await axios.get(`${apiURL}/users/${id}/likes `, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return res.data;
  } catch (error) {
    console.error("[Get UserLikeTweets failed]", error);
  }
};

// 設定頁 post 更改使用者帳號資料
export const patchAccountInfo = async (userToken, id, userInfo) => {
  try {
    const { account, name, email, password, checkPassword } = userInfo;
    const res = await axios.patch(
      `${apiURL}/users/${id}`,
      {
        account,
        name,
        email,
        password,
        checkPassword,
      },
      { headers: { Authorization: "Bearer " + userToken } }
    );
    return res.data;
  } catch (error) {
    console.error("[postAccountInfo failed]", error);
    if (error.response) {
      console.error(error);
      return error.response.data;
    }
  }
};

// 許多頁取得使用者資料
export const getAccountInfo = async (userToken, id) => {
  try {
    const { data } = await axios.get(`${apiURL}/users/${id}`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[getAccountInfo failed]", error);
  }
};

// 取得ReplyList頁面的回覆串
export const getSingleTweet = async ({ userToken, TweetId }) => {
  try {
    const { data } = await axios.get(`${apiURL}/tweets/${TweetId}/replies`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[getAccountInfo failed]", error);
  }
};

export const getSingleTweetInfo = async ({ userToken, TweetId }) => {
  try {
    const { data } = await axios.get(`${apiURL}/tweets/${TweetId}`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[getAccountInfo failed]", error);
  }
};

// -- Other頁面取得 Other 資料
// -- follow 頁取得 follower 資料
export const getUserFollowers = async (userToken, id) => {
  try {
    const { data } = await axios.get(`${apiURL}/users/${id}/followers`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[getUserFollowers failed]", error);
  }
};

// -- follow 頁取得 following 資料
export const getUserFollowing = async (userToken, id) => {
  try {
    const { data } = await axios.get(`${apiURL}/users/${id}/followings`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[getUserFollowings failed]", error);
  }
};

// -- follow 頁點擊後追隨
export const postUserFollow = async (userToken, id) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/followships/`,
      { id },
      { headers: { Authorization: "Bearer " + userToken } }
    );
    return data;
  } catch (error) {
    console.error("[postUserFollow failed]", error);
  }
};

// -- follow 頁點擊後取消追蹤
export const deleteUserFollow = async (userToken, id) => {
  try {
    const { data } = await axios.delete(`${apiURL}/followships/${id}`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[deleteUserFollow failed]", error);
  }
};

// -- popular 取得資料
export const getpopularData = async (userToken) => {
  try {
    const { data } = await axios.get(`${apiURL}/followships/topFollowers`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    return data;
  } catch (error) {
    console.error("[getpopularData failed]", error);
  }
};

// -- 個人頁修改 avatar, cover , name , introduction
export const putPersonalInfo = async (userToken, id, formData) => {
  try {
    const { data } = await axios.put(`${apiURL}/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + userToken,
      },
    });
    return data;
  } catch (error) {
    console.error("[putPersonalInfo failed]", error);
  }
};
