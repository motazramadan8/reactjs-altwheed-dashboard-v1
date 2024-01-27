import request from "../request";
import { toast } from "react-toastify";
import toastOptions from "../../toastOpt";
import { whatsappActions } from "../slices/whatsappSlice";

// Get Whatsapp
export function getWhatsapp() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/whatsapp`);
      dispatch(whatsappActions.setWhatsapp(data));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    }
  };
}

// Add Whatsapp
export function createWhatsapp(newNum, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/v1/whatsapp`, newNum, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(whatsappActions.setWhatsapp(data));
      toast.success("Whatsapp added successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Update Whatsapp
export function updateWhatsapp(whatsapp, token, whatsappId) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(
        `/api/v1/whatsapp/${whatsappId}`,
        whatsapp,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(whatsappActions.updateWhatsapp(data));
      toast.success("Whatsapp updated successfully", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Delete Whatsapp
export function deleteWhatsapp(token, whatsappId) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/v1/whatsapp/${whatsappId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(whatsappActions.deleteWhatsapp());
      toast.success("Whatsapp deleted successfully", toastOptions);
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}
