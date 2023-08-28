import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

const userId = localStorage.getItem("userID");

const axiosInstance = axios.create({
    baseURL: apiURL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("UserToken");
        if (token) {
            config.headers["Authorization"] = `Bear ${token}`;
        }
        return config;
    },
    (error) => {
        console.error(error)
    }
)

// get users tweets
export const getUserTweets = async () => {
    try{
        const res = await axiosInstance.get(`${apiURL}/users/${userId}/tweets`)
        return res.data;
    } catch (error) {
        console.error("[Get UserTweets failed]:", error);
    }
}

// get users replied
export const getUserReplied = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/users/${userId}/replied_tweets`)
        return res.data;
    } catch (error) {
        console.error("[Get UserReplied failed]:", error);
    }
}

// get users likes
export const getUserLikes = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/users/${userId}/likes`)
        return res.data;
    } catch (error) {
        console.error("[Get UserLikes failed]:", error);
    }
}

//get users followings
export const getUserFollowings = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/users/${userId}/followings`)
        return res.data;
    } catch (error) {
        console.error("[Get UserFollowings failed]:", error);
    }
}

//get users followers
export const getUserFollowers = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/users/${userId}/followers`)
        return res.data;
    } catch (error) {
        console.error("[Get UserFollowers failed]:", error);
    }
}

//get users id
export const getUser = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/users/${userId}`)
        return res.data
    } catch (error) {
        console.error("[Get UserId failed]:", error)
    }
}