import axiosService from "../axios/axiosBase";

const register = async (credentials) => {
  return axiosService("/api/user/signup", {
    method: "POST",
    data: JSON.stringify(credentials),
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export default function useRegister() {
  return { register };
}
