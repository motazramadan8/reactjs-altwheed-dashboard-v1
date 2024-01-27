import request from "../request";
import { authActions } from "../slices/authSlice";

import toastOptions from "../../toastOpt";
import { toast } from "react-toastify";

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/v1/auth/register", user);
      toast.success("User created successfully", toastOptions);
      dispatch(
        authActions.register(
          `${data.user.split(" ")[0].toString()}, ${data.msg}`
        )
      );
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, toastOptions);
    }
  };
}

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/v1/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("user", JSON.stringify(data));
      toast.success(`Welcome Back `, toastOptions);
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
    window.location.reload();
  };
}
