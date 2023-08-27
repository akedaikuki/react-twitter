import axios from "axios";

const baseURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        console.log(error)
    }
)


// get使用者
export const getUser = async (id) => {
    try {
        const res = await axiosInstance.get(`${baseURL}/users/${id}`);
        return res
    } catch (error) {
        console.error("[Get user failed]", error.response.data.message)
    }
};

// put編輯個人資料
export const putUserSelf = async (id, formData) => {
    try {
      const res = await axiosInstance.put(`${baseURL}/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (error) {
      console.error("[Put user failed]", error.response.data.message);
      return error;
    }
};