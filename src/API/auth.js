import axios from "axios";

const apiURL = "https://secure-beach-58251-e97c6ff22f2e.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const res = await axios.post(`${apiURL}/users/signin`, {
      account,
      password,
    });

    if (!res || !res.data) {
      throw Error("nothing returned");
    }
    return data
  } catch (error) {
    if (error.response) {
      console.error(error)
      return (error.response.data)
    }

    const userData = res.data.data?.user;
    const userToken = res.data.data?.token;

    if (!userData) {
      throw Error("no user data");
    }
    if (!userToken) {
      throw Error("no user token");
    }
    return data
  } catch (error) {
    console.error(error)
    if (error.response) {
      return (error.response.data)
    }
  }
}

export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${apiURL}/admin/login`, { account, password })
    const { status } = data
    const token = data.data.token
    if (status === 'success') {
      return { success: true, token, ...data }
    }
    return data
  } catch (error) {
    console.error(error)
    if (error.response) {
      return (error.response.data)
    }
  }
};

// export const checkPermission = async (userToken) => {
//   try {
//     const response = await axios.get(`${apiURL}/test-token`, {
//       headers: {
//         Authorization: "Bearer " + userToken,
//       },
//     });

//     return response.data.success;
//   } catch (error) {
//     console.log("[Check Permission Failed]:", error);
//   }
// };
