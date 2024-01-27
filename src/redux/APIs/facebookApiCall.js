import { facebookActions } from "../slices/facebookSlice";
import request from "../request";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";

// Get Facebook Link
export function getFacebookLink() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/facebook`);
      dispatch(facebookActions.setFacebook(data));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    }
  };
}

// Add Facebook Link
export function createFacebookLink(newLink, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/v1/facebook`, newLink, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(facebookActions.setFacebook(data));
      toast.success("Facebook link added successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Update Facebook Link
export function updateFacebookLink(newLink, token, facebookId) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(
        `/api/v1/facebook/${facebookId}`,
        newLink,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(facebookActions.updateFaceebook(data));
      toast.success("Facebook link updated successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Delete Facebook Link
export function deleteFacebookLink(token, facebookId) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/v1/facebook/${facebookId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(facebookActions.deleteFacebook());
      toast.success("Facebook link deleted successfully", toastOptions);
      // window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}
