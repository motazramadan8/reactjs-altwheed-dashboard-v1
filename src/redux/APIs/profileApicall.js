import { toast } from "react-toastify";
import request from "../request";
import { profileActions } from "../slices/profilesSlice";
import { authActions } from "../slices/authSlice";
import toastOptions from "../../toastOpt";

// Get All Profiles
export function getAllProfiles(token) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/users/profile`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    }
  };
}

// Delete User
export function deleteUser(profileId, token) {
  return async (dispatch) => {
    try {
      await request.delete(`/api/v1/users/profile/${profileId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(profileActions.deleteProfiles(profileId));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
      console.log(error);
    }
  };
}

// Update User
export function updateUser(newData, userId, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(
        `/api/v1/users/profile/${userId}`,
        newData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(profileActions.setProfiles(data));
      dispatch(authActions.setFirstName(data.firstName));
      dispatch(authActions.setLastName(data.lastName));
      dispatch(authActions.setEmail(data.email));
      dispatch(authActions.setPhone(data.phone));
      toast.success("User Updated Successfully", toastOptions);

      const user = JSON.parse(localStorage.getItem("user"));
      user.firstName = data?.firstName;
      user.lastName = data?.lastName;
      user.email = data?.email;
      user.phone = data?.phone;
      localStorage.setItem("user", JSON.stringify(user));

      // window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
      console.log(error);
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/v1/users/profile/profile-photo-upload",
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(authActions.setProfilePhoto(data.image));
      const user = JSON.parse(localStorage.getItem("user"));
      toast.success(`Image Updated Successfully`, toastOptions);
      // Update User Photo In Local Storage
      user.image = data?.user?.image;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}
