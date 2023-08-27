import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: apiURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('UserToken');
    console.log(token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

// get tweets api
export const getTweets = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/tweets`);
        return res.data;
    } catch (error) {
        console.error('[Get Tweets failed]:', error);
    }
}

// post tweets api
export const postTweets = async ({description}) => {
    try {
        const res = await axiosInstance.post(`${apiURL}/tweets`, {
            description
        });
        return res.data;
    } catch (error) {
        console.error('[Post Tweets failed]:', error);
        throw error
    }
}

// get tweet_id api
export const getTweetId = async ({tweet_id}) => {
    try {
        const res = await axiosInstance.get(`${apiURL}/tweets/${tweet_id}`);
        return res.data;
    } catch (error) {
        console.error('[Get Tweet_id failed]:', error);
    }
}

// get tweets_id replies api
export const getReplies = async ({tweet_id}) => {
    try {
        const res = await axiosInstance.get(`${apiURL}/tweets/${tweet_id}/replies`);
        return res.data
    } catch (error) {
        console.error('[Get Tweets_id replies failed]:', error);
    }
}