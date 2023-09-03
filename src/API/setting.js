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
export const getUser = async (userId) => {
  try {
    const { data } = await axiosInstance.get(`${apiURL}/users${userId}`)
    if (data)
    return data
  } catch (error) {
    console.error('[Get user info Failed], error')
    return error
  }
}

// put編輯個人資料
export const putUser = async ({ account, name, email, password, checkPassword, userId}) => {
  try {
    const { data } = await axiosInstance.put(`${apiURL}/users${userId}`, {
      account,
      name,
      email,
      password,
      checkPassword,
    })
    return data
  } catch (error) {
    console.error('[Set account Failed]', error)
    console.log(error.message)
    return error
  }
}

// patch個人資料
export const patchUser = async ({ account, name, email, password, checkPassword, userId}) => {
  try {
    const { data } = await axiosInstance.patch(`${apiURL}/users${userId}`, {
      account,
      name,
      email,
      password,
      checkPassword,
    })
    return data
  } catch (error) {
    console.error('[Set account Failed]', error)
    console.log(error.message)
    return error
  }
}
