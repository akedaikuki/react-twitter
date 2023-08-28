import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";
const userId = localStorage.getItem('userID')

const axiosInstance = axios.create({
    baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
    }
)



// get使用者
export const getUser = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/users/:id`);
        return res
    } catch (error) {
        console.error("[Get user failed]", error)
    }
};

// put編輯個人資料
export const putUser = async ({name, account, email, password, checkPassword}) => {
    try {
      const res = await axiosInstance.put(`${apiURL}/users/:id`, {
          name,
          account,
          email,
          password,
          checkPassword
      });
      return res.data
    } catch (error) {
      console.error('[PUT User failed]: ', error);
    }
  }