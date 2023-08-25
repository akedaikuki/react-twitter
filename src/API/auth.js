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

    if (res.status >= 400 || res.data.status !== "success") {
      throw Error("request has error");
    }

    const userData = res.data.data?.user;
    const userToken = res.data.data?.token;

    if (!userData) {
      throw Error("no user data");
    }
    if (!userToken) {
      throw Error("no user token");
    }

    return { success: true, userData, userToken };
  } catch (error) {
    console.error("[Login Failed]:", error);
    return {
      success: false,
      errorMessage: error?.message,
    };
  }
};

export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const res = await axios.post(`${apiURL}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });

    console.log(res);

    if (!res || !res.data) {
      throw Error("nothing returned");
    }

    if (res.status >= 400 || res.data.status !== "success") {
      throw Error("request has error");
    }

    const userData = res.data.data?.user;
    const userToken = res.data.data?.token;

    if (!userData) {
      throw Error("no user data");
    }

    return { success: true, userData, userToken};
  } catch (error) {
    console.error("[Login Failed]:", error);
    return {
      success: false,
      errorMessage: error?.message,
    };
  }
};