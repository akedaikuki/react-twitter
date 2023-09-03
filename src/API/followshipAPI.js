import axios from "axios";
// import jwt from "jwt-decode";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

// const axiosInstance = axios.create({
//     baseURL: apiURL,
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem("UserToken");
//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
const token = localStorage.getItem("UserToken");
//取得Top 10推薦追隨
export const getTopFollwer = async ({ UserToken }) => {
  try {
    const { data } = await axios.get(`${apiURL}/followships/topFollowers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return { data };
  } catch (error) {
    console.log(error);
  }
};

//追隨
export const postFollowed = async ({ userId, UserToken }) => {
  try {
    const { status } = await axios.post(
      `${apiURL}/followships?=${userId}`,
      { id: userId },
      {
        headers: {
          Authorization: "Bearer " + UserToken,
        },
      }
    );
    return status;
  } catch (error) {
    console.log(error);
  }
};

//取消追隨
export const deleteFollowed = async ({ followingId, UserToken }) => {
  try {
    const { status } = await axios.delete(
      `${apiURL}/followships/${followingId}`,
      {
        headers: {
          Authorization: "Bearer " + UserToken,
        },
      }
    );
    return status;
  } catch (error) {
    console.log(error);
  }
};
