import { linkedinActions } from "../slices/linkedinSlice";
import request from "../request";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";

// Get Linkedin Link
export function getLinkedinLink() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/linkedin`);
      dispatch(linkedinActions.setLinkedin(data));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    }
  };
}

// Add Linkedin Link
export function createLinkedinLink(newLink, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/v1/linkedin`, newLink, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(linkedinActions.setLinkedin(data));
      toast.success("linkedin link added successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Update Linkedin Link
export function updateLinkedinLink(newLink, token, linkedinId) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(
        `/api/v1/linkedin/${linkedinId}`,
        newLink,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(linkedinActions.updateLinkedin(data));
      toast.success("Linkedin link updated successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Delete Linkedin Link
export function deleteLinkedinLink(token, linkedinId) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/v1/linkedin/${linkedinId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(linkedinActions.deleteLinkedin());
      toast.success("Linkedin link deleted successfully", toastOptions);
      // window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}
