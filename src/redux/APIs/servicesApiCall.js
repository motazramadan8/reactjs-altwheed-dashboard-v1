import { toast } from "react-toastify";
import request from "../request";
import { serviceActions } from "../slices/servicesSlice";
import toastOptions from "../../toastOpt";

// Get All Services
export function getAllServices() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/services`);
      dispatch(serviceActions.setServices(data));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    }
  };
}

// Create Service
export function createService(newService, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`/api/v1/services`, newService, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(serviceActions.setServices(data));
      toast.success("Service created", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.msg, toastOptions);
    }
  };
}

// Delete Service
export function deleteService(serviceId, token) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/v1/services/${serviceId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(serviceActions.deleteProfiles(serviceId));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
      console.log(error);
    }
  };
}

// Update Service
export function updateService(newData, serviceId, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(
        `/api/v1/services/${serviceId}`,
        newData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(serviceActions.setServices(data));
      window.location.reload();
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
      console.log(error);
    }
  };
}
