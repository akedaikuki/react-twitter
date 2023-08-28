import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

const axiosInstance = axios.create({
    baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("UserToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
    }
  );

// get followship top
export const getFollowshipTop = async () => {
    try {
        const res = await axiosInstance.get(`${apiURL}/followships/top`);
        return res.data
    } catch(error) {
        console.error("[Get FollowshipTop failed]: ", error);
        throw error;
    }
}

// delete followship
export const deleteFollowship = async ({ followingId }) => {
    try {
        const res = await axiosInstance.delete(`${apiURL}/followships/${followingId}`, {followingId});
        return res.data
    } catch (error) {
        console.error("[Delete Followship failed]: ", error);
        throw error;
    }
}

// post followship
export const postFollowship = async ({ id }) => {
    try {
        const res = await axiosInstance.post(`${apiURL}/followships`, {id,});
        return res.data;
    } catch (error) {
        console.error("[Post Followship failed]: ", error);
        throw error;
    }
}