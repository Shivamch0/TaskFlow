import api from "../axios";

const registerUser = async (data) => {
    const res = await api.post("/user/register" , data);
    return res.data;
}

export { registerUser }