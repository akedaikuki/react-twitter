import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

// 登入後台
export const adminLogin = async ({ account, password }) => {
  try {
    const res = await axios.post(`${apiURL}/admin/login`, {
      account,
      password,
    });
    // 檢查是否有 res 物件回傳以及 data 是否存在
    if (!res || !res.data) {
      throw Error("nothing returned");
    }

    if (res.status >= 400 || res.data.status !== "success") {
      throw Error("request has error");
    }

    const adminData = res.data.data?.user;
    const adminToken = res.data.data?.token;

    if (!adminData) {
      throw Error("no user data");
    }
    if (!adminToken) {
      throw Error("no user token");
    }

    return { success: true, adminData, adminToken };
  } catch (error) {
    console.error("[Login Failed]:", error);
    return {
      success: false,
      errorMessage: error?.message,
    };
  }
}


const axiosInstance = axios.create({
  baseURL: apiURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AdminToken');
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

// get 管理員 users
export const getAdminUsers = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/admin/users`);
    return res.data
  } catch (error) {
    console.error('[GET AdminUsers failed]:', error)
  }
}

// delete 管理員 tweets_id
export const deleteAdminTweets = async ({id}) => {
  try {
    const res = await axiosInstance.delete(`${apiURL}/admin/tweets/${id}`);
    return res.data
  } catch (error) {
    console.error('[Delete AdminTweets failed]:', error)
  }
}