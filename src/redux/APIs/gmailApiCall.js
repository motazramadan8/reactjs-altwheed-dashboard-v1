import { gmailActions } from "../slices/gmailSlice";
import request from "../request";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";

// Get Gmail Link
export function getGmail() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/gmail`);
      dispatch(gmailActions.setGmail(data));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    }
  };
}

// Add Gamil Link
export function createGmail(newLink, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/v1/gmail`, newLink, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(gmailActions.setGmail(data));
      toast.success("Gmail link added successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Update Gmail
export function updateGmail(newLink, token, gmailId) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(`/api/v1/gmail/${gmailId}`, newLink, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(gmailActions.updateGmail(data));
      toast.success("Gmail link updated successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Delete Gmail Link
export function deleteGmail(token, gmailId) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/v1/gmail/${gmailId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(gmailActions.deleteGmail());
      toast.success("Gmail link deleted successfully", toastOptions);
      // window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}
