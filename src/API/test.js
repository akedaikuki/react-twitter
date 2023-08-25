import axios from "axios";

const baseUrl = 'https://localhost:3000/Login';

export const getLogin = async () => {
    try {
        const res = await axios.get(`${baseUrl}/Login`)
        return res.data
    } catch (error) {
        console.error('[Get Login failed]:', error)
    }
};

export const createLogin = async (payload) => {

    try {
    const { title, isDone } = payload;
    const res = await axios.post(`${baseUrl}/Login`, {
        title,
        isDone
    });
    return res.data
  } catch (error) {
    console.error('[Create Login failed]:', error)
  }
};

const patchLogin = () => {};

const deleteLogin = () => {};